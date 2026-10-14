// Configuración de Supabase
// Reemplaza estas dos constantes con las credenciales de tu proyecto Supabase:
// (Project Settings -> API en app.supabase.com)
const SUPABASE_URL = 'https://mrphzeqtiojnwjpuxrfp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycGh6ZXF0aW9qbndqcHV4cmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NDY0MjgsImV4cCI6MjEwNzUyMjQyOH0.M7JbwQV07ukF5xOSH62obSXuOLD359GktZzTfKenkzE';

const isSupabaseConfigured = () => {
    return SUPABASE_URL && !SUPABASE_URL.includes('TU_PROYECTO') && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('TU_SUPABASE');
};

const supabaseClient = (window.supabase && isSupabaseConfigured())
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
