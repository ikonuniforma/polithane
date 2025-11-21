import { useState, useMemo } from 'react';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatTimeAgo } from '../utils/formatters';
import { mockUsers } from '../mock/users';
import { mockConversations, mockMessages, generateMockMessages } from '../mock/messages';

export const MessagesPage = () => {
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Konuşmaları kullanıcı bilgileriyle birleştir
  const conversations = useMemo(() => {
    return mockConversations.map(conv => {
      const user = mockUsers.find(u => u.user_id === conv.participant_id);
      return {
        ...conv,
        user: user || mockUsers[0], // Fallback
        lastMessage: conv.last_message,
        unread: conv.unread_count,
        time: conv.last_message_time
      };
    });
  }, []);

  const selectedConv = conversations.find(c => c.conversation_id === selectedConvId);

  // Seçilen konuşmanın mesajlarını al
  const currentMessages = useMemo(() => {
    if (!selectedConvId) return [];
    return mockMessages[selectedConvId] || generateMockMessages(selectedConvId, 15);
  }, [selectedConvId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConvId) return;
    // Burada gerçek uygulamada API çağrısı yapılacak
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-main py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 h-[600px]">
          {/* Konuşma Listesi */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Mesajlar</h2>
            </div>
            <div className="overflow-y-auto flex-1">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Henüz mesajınız yok
                </div>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.conversation_id}
                    onClick={() => setSelectedConvId(conv.conversation_id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConvId === conv.conversation_id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar src={conv.user.profile_image} size="48px" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold truncate">{conv.user.full_name}</span>
                          {conv.unread > 0 && (
                            <Badge variant="danger" size="small">{conv.unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(conv.time)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Mesaj Thread */}
          <div className="bg-white rounded-xl border border-gray-200 flex flex-col">
            {selectedConv ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar src={selectedConv.user.profile_image} size="40px" />
                    <div>
                      <h3 className="font-semibold">{selectedConv.user.full_name}</h3>
                      <p className="text-xs text-gray-500">{selectedConv.user.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {currentMessages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        Henüz mesaj yok
                      </div>
                    ) : (
                      currentMessages.map((message) => {
                        const isFromMe = message.sender_id === 'currentUser';
                        const sender = isFromMe 
                          ? null 
                          : mockUsers.find(u => u.user_id === message.sender_id);
                        
                        return (
                          <div
                            key={message.message_id}
                            className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex gap-2 max-w-[70%] ${isFromMe ? 'flex-row-reverse' : 'flex-row'}`}>
                              {!isFromMe && sender && (
                                <Avatar src={sender.profile_image} size="32px" />
                              )}
                              <div className="flex flex-col">
                                <div
                                  className={`rounded-lg px-4 py-2 ${
                                    isFromMe
                                      ? 'bg-primary-blue text-white'
                                      : 'bg-gray-100 text-gray-900'
                                  }`}
                                >
                                  {message.message_text}
                                </div>
                                <span className={`text-xs text-gray-400 mt-1 ${isFromMe ? 'text-right' : 'text-left'}`}>
                                  {formatTimeAgo(message.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Mesajınızı yazın..."
                      className="flex-1"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>Gönder</Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Bir konuşma seçin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
