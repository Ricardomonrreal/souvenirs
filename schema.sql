-- ==============================================================================
-- SCHEMA SUPABASE: GESTOR DE COMPRAS Y REGALOS
-- ==============================================================================

-- 1. Habilitar extensión para UUIDs si no está activa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Eliminar tablas previas en caso de reinicio limpio (opcional)
DROP TABLE IF EXISTS public.items CASCADE;
DROP TABLE IF EXISTS public.people CASCADE;

-- 3. Tabla de Personas / Listas
CREATE TABLE public.people (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla de Artículos / Productos por Persona
CREATE TABLE public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT false NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Índices para mejorar rendimiento de consultas y ordenamiento
CREATE INDEX idx_people_position ON public.people(position);
CREATE INDEX idx_items_person_id ON public.items(person_id);
CREATE INDEX idx_items_completed ON public.items(completed);
CREATE INDEX idx_items_position ON public.items(position);

-- 6. Trigger para autoactualizar 'updated_at'
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_people_updated
    BEFORE UPDATE ON public.people
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_items_updated
    BEFORE UPDATE ON public.items
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 7. Habilitar Row Level Security (RLS)
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- 8. Políticas de Acceso RLS (Permisos anónimos/públicos para desarrollo rápido sin Auth)
-- Si luego agregas Supabase Auth, puedes reemplazar 'anon, authenticated' por 'authenticated' y vincular a user_id
CREATE POLICY "Permitir todo en people a usuarios anon y authenticated"
    ON public.people FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir todo en items a usuarios anon y authenticated"
    ON public.items FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 9. Habilitar Realtime para reflejar cambios en vivo (opcional pero muy recomendado en Supabase)
ALTER PUBLICATION supabase_realtime ADD TABLE public.people;
ALTER PUBLICATION supabase_realtime ADD TABLE public.items;

-- ==============================================================================
-- 10. INSERCIÓN DE DATOS INICIALES (Misma información de tu app)
-- ==============================================================================

DO $$
DECLARE
    v_person_id UUID;
BEGIN
    -- 1. Souvenir
    INSERT INTO public.people (name, position) VALUES ('Souvenir', 1);

    -- 2. Sil
    INSERT INTO public.people (name, position) VALUES ('Sil', 2);

    -- 3. Yess
    INSERT INTO public.people (name, position) VALUES ('Yess', 3);

    -- 4. Mamá
    INSERT INTO public.people (name, position) VALUES ('Mamá', 4) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Blusa japonesa', false, 1);

    -- 5. Memo
    INSERT INTO public.people (name, position) VALUES ('Memo', 5) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Algo de Mizuno', false, 1),
        (v_person_id, 'Algo de fisioterapia', false, 2);

    -- 6. Chori
    INSERT INTO public.people (name, position) VALUES ('Chori', 6) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Algo de fútbol', false, 1);

    -- 7. Mamá de Sofi
    INSERT INTO public.people (name, position) VALUES ('Mamá de Sofi', 7);

    -- 8. Luis
    INSERT INTO public.people (name, position) VALUES ('Luis', 8);

    -- 9. Cen
    INSERT INTO public.people (name, position) VALUES ('Cen', 9);

    -- 10. Pedro
    INSERT INTO public.people (name, position) VALUES ('Pedro', 10) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Souvenir', false, 1);

    -- 11. Alfredo
    INSERT INTO public.people (name, position) VALUES ('Alfredo', 11) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Souvenir', false, 1);

    -- 12. Eva
    INSERT INTO public.people (name, position) VALUES ('Eva', 12);

    -- 13. Dani
    INSERT INTO public.people (name, position) VALUES ('Dani', 13) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Algo de Turtwig', false, 1);

    -- 14. Collete
    INSERT INTO public.people (name, position) VALUES ('Collete', 14) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Zoro', false, 1);

    -- 15. Abiel
    INSERT INTO public.people (name, position) VALUES ('Abiel', 15) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Algo de pokemon', false, 1);

    -- 16. Nao
    INSERT INTO public.people (name, position) VALUES ('Nao', 16) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Cámara?', false, 1);

    -- 17. Julieta
    INSERT INTO public.people (name, position) VALUES ('Julieta', 17) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Algo de café', false, 1);

    -- 18. July
    INSERT INTO public.people (name, position) VALUES ('July', 18) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Final Fantasy', false, 1),
        (v_person_id, 'Joji', false, 2),
        (v_person_id, 'Resident evil', false, 3);

    -- 19. Tía Miriam
    INSERT INTO public.people (name, position) VALUES ('Tía Miriam', 19) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Souvenir', false, 1);

    -- 20. Victor
    INSERT INTO public.people (name, position) VALUES ('Victor', 20) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Regalo principal', false, 1);

    -- 21. Tito
    INSERT INTO public.people (name, position) VALUES ('Tito', 21) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Detalle sorpresa', false, 1);

    -- 22. Chuy
    INSERT INTO public.people (name, position) VALUES ('Chuy', 22) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Artículo pendiente', false, 1);

    -- 23. Botella de ohtani
    INSERT INTO public.people (name, position) VALUES ('Botella de ohtani', 23) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Botella temática coleccionable', false, 1);

    -- 24. Baudel (Completados)
    INSERT INTO public.people (name, position) VALUES ('Baudel', 24) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Manga de Jojos', true, 1),
        (v_person_id, 'Figura de Jojos', true, 2);

    -- 25. Sofía Herrera (Completado)
    INSERT INTO public.people (name, position) VALUES ('Sofía Herrera', 25) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Monedero', true, 1);

    -- 26. Papá (Completado)
    INSERT INTO public.people (name, position) VALUES ('Papá', 26) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Amuleto para el tráfico azul', true, 1);

    -- 27. Erika (Completado)
    INSERT INTO public.people (name, position) VALUES ('Erika', 27) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Amuleto para la buena salud', true, 1);

    -- 28. Caro (Completado)
    INSERT INTO public.people (name, position) VALUES ('Caro', 28) RETURNING id INTO v_person_id;
    INSERT INTO public.items (person_id, text, completed, position) VALUES 
        (v_person_id, 'Merch oficial de Stray kidz', true, 1);

END $$;
