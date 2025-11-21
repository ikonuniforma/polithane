import { useState, useEffect, useRef } from 'react';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatTimeAgo } from '../utils/formatters';
import { mockUsers } from '../mock/users';
import { mockConversations, mockMessages, generateMockMessages } from '../mock/messages';

export const MessagesPage = () => {
  const [selectedConv, setSelectedConv] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // Mock verilerden konuşmaları oluştur
  useEffect(() => {
    const formattedConversations = mockConversations.map(conv => {
      const user = mockUsers.find(u => u.user_id === conv.participant_id);
      return {
        id: conv.conversation_id,
        user: user || mockUsers[0],
        lastMessage: conv.last_message,
        unread: conv.unread_count,
        time: conv.last_message_time,
        messageType: conv.message_type
      };
    });
    setConversations(formattedConversations);
  }, []);

  // Seçilen konuşmanın mesajlarını yükle
  useEffect(() => {
    if (selectedConv) {
      const conversationMessages = mockMessages[selectedConv.id] || 
                                   generateMockMessages(selectedConv.id, 15);
      setCurrentMessages(conversationMessages);
    } else {
      setCurrentMessages([]);
    }
  }, [selectedConv]);

  // Mesajlar değiştiğinde en alta scroll yap
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Mesaj gönder
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConv) return;

    const newMessage = {
      message_id: Date.now(),
      conversation_id: selectedConv.id,
      sender_id: 'currentUser',
      receiver_id: selectedConv.user.user_id,
      message_text: messageText.trim(),
      created_at: new Date().toISOString(),
      is_read: false
    };

    setCurrentMessages([...currentMessages, newMessage]);
    setMessageText('');

    // Konuşma listesindeki son mesajı güncelle
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConv.id 
        ? { ...conv, lastMessage: messageText.trim(), time: new Date().toISOString() }
        : conv
    ));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-main py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 h-[600px]">
          {/* Konuşma Listesi */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Mesajlar</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {conversations.length > 0 ? (
                conversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConv(conv)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConv?.id === conv.id ? 'bg-blue-50' : ''
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
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Henüz konuşma yok
                </div>
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
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {currentMessages.length > 0 ? (
                      currentMessages.map((message) => {
                        const isFromMe = message.sender_id === 'currentUser';
                        return (
                          <div key={message.message_id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg px-4 py-2 max-w-[70%] ${
                              isFromMe 
                                ? 'bg-primary-blue text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p>{message.message_text}</p>
                              <p className={`text-xs mt-1 ${
                                isFromMe ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {formatTimeAgo(message.created_at)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Henüz mesaj yok
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Mesajınızı yazın..." 
                      className="flex-1"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && messageText.trim()) {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      Gönder
                    </Button>
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
