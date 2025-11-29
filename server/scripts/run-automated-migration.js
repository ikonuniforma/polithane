import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const sql = postgres(process.env.DATABASE_URL || '', {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
});

async function runMigration() {
  try {
    console.log('🚀 Starting is_automated migration...');
    
    // Read migration file
    const migrationPath = path.join(__dirname, '../migrations/004_add_automated_profiles.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
    
    // Execute migration
    await sql.unsafe(migrationSQL);
    
    console.log('✅ is_automated field added to users table');
    
    // Verify
    const result = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'is_automated'
    `;
    
    if (result.length > 0) {
      console.log('✅ Verification successful:', result[0]);
    }
    
    // Check how many users are marked as automated
    const [count] = await sql`
      SELECT COUNT(*) as automated_count
      FROM users
      WHERE is_automated = true
    `;
    
    console.log(`✅ ${count.automated_count} profiles marked as automated`);
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

runMigration();
