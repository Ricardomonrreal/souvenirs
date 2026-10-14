// Configuración de Tailwind CSS
if (window.tailwind) {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    darkbg: '#121418',
                    darksurface: '#1a1e24',
                    darkcard: '#20262f',
                    darkinput: '#171b21',
                    darkborder: '#2b3340',
                    brand: {
                        teal: '#0d9488',
                        tealHover: '#0f766e',
                        tealDark: '#115e59',
                        tealLight: '#14b8a6',
                        tealBg: '#132e2b',
                        tealBorder: '#1d4d47'
                    },
                    accent: {
                        orange: '#ff5a1f',
                        orangeHover: '#fa4b0d',
                        green: '#22c55e',
                        greenBg: '#122b22',
                        yellow: '#f59e0b'
                    }
                }
            }
        }
    };
}

// Datos iniciales actualizados completos con todas las personas y regalos
const defaultData = [
    {
        id: "p1",
        name: "Souvenir",
        items: []
    },
    {
        id: "p2",
        name: "Sil",
        items: []
    },
    {
        id: "p3",
        name: "Yess",
        items: []
    },
    {
        id: "p4",
        name: "Mamá",
        items: [
            { id: "i_m1", text: "Blusa japonesa", completed: false }
        ]
    },
    {
        id: "p5",
        name: "Memo",
        items: [
            { id: "i_me1", text: "Algo de Mizuno", completed: false },
            { id: "i_me2", text: "Algo de fisioterapia", completed: false }
        ]
    },
    {
        id: "p6",
        name: "Chori",
        items: [
            { id: "i_ch1", text: "Algo de fútbol", completed: false }
        ]
    },
    {
        id: "p7",
        name: "Mamá de Sofi",
        items: []
    },
    {
        id: "p8",
        name: "Luis",
        items: []
    },
    {
        id: "p9",
        name: "Cen",
        items: []
    },
    {
        id: "p10",
        name: "Pedro",
        items: [
            { id: "i_pe1", text: "Souvenir", completed: false }
        ]
    },
    {
        id: "p11",
        name: "Alfredo",
        items: [
            { id: "i_al1", text: "Souvenir", completed: false }
        ]
    },
    {
        id: "p12",
        name: "Eva",
        items: []
    },
    {
        id: "p13",
        name: "Dani",
        items: [
            { id: "i_da1", text: "Algo de Turtwig", completed: false }
        ]
    },
    {
        id: "p14",
        name: "Collete",
        items: [
            { id: "i_co1", text: "Zoro", completed: false }
        ]
    },
    {
        id: "p15",
        name: "Abiel",
        items: [
            { id: "i_ab1", text: "Algo de pokemon", completed: false }
        ]
    },
    {
        id: "p16",
        name: "Nao",
        items: [
            { id: "i_na1", text: "Cámara?", completed: false }
        ]
    },
    {
        id: "p17",
        name: "Julieta",
        items: [
            { id: "i_ju1", text: "Algo de café", completed: false }
        ]
    },
    {
        id: "p18",
        name: "July",
        items: [
            { id: "i_jy1", text: "Final Fantasy", completed: false },
            { id: "i_jy2", text: "Joji", completed: false },
            { id: "i_jy3", text: "Resident evil", completed: false }
        ]
    },
    {
        id: "p19",
        name: "Tía Miriam",
        items: [
            { id: "i_tm1", text: "Souvenir", completed: false }
        ]
    },
    {
        id: "p20",
        name: "Victor",
        items: [
            { id: "i1", text: "Regalo principal", completed: false }
        ]
    },
    {
        id: "p21",
        name: "Tito",
        items: [
            { id: "i2", text: "Detalle sorpresa", completed: false }
        ]
    },
    {
        id: "p22",
        name: "Chuy",
        items: [
            { id: "i3", text: "Artículo pendiente", completed: false }
        ]
    },
    {
        id: "p23",
        name: "Botella de ohtani",
        items: [
            { id: "i4", text: "Botella temática coleccionable", completed: false }
        ]
    },
    {
        id: "p24",
        name: "Baudel",
        items: [
            { id: "i5", text: "Manga de Jojos", completed: true },
            { id: "i6", text: "Figura de Jojos", completed: true }
        ]
    },
    {
        id: "p25",
        name: "Sofía Herrera",
        items: [
            { id: "i7", text: "Monedero", completed: true }
        ]
    },
    {
        id: "p26",
        name: "Papá",
        items: [
            { id: "i_pa1", text: "Amuleto para el tráfico azul", completed: true }
        ]
    },
    {
        id: "p27",
        name: "Erika",
        items: [
            { id: "i_er1", text: "Amuleto para la buena salud", completed: true }
        ]
    },
    {
        id: "p28",
        name: "Caro",
        items: [
            { id: "i_ca1", text: "Merch oficial de Stray kidz", completed: true }
        ]
    }
];

let state = [];
let modalConfig = { type: '', personId: null };
let collapsedCompleted = {}; // Para guardar el estado de acordeón de completados por persona

// Cargar estado desde localStorage
function loadState() {
    const saved = localStorage.getItem('gift_tracker_state_v1');
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch(e) {
            state = defaultData;
        }
    } else {
        state = defaultData;
    }
}

function saveState() {
    localStorage.setItem('gift_tracker_state_v1', JSON.stringify(state));
    render();
}

function resetData() {
    if(confirm("¿Deseas restaurar los elementos de ejemplo iniciales?")) {
        state = JSON.parse(JSON.stringify(defaultData));
        saveState();
        showToast("Datos restaurados correctamente");
    }
}

function render() {
    const container = document.getElementById('lists-container');
    const emptyState = document.getElementById('empty-state');
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    container.innerHTML = '';

    let totalItemsCount = 0;
    let totalCompletedCount = 0;
    let hasVisibleContent = false;

    // Separar personas completadas (todos sus ítems listos y al menos 1 ítem) de las pendientes
    const isPersonCompleted = (p) => p.items.length > 0 && p.items.every(i => i.completed);

    const pendingPeople = [];
    const completedPeople = [];

    state.forEach(person => {
        // Filtrado por búsqueda
        const matchesPerson = person.name.toLowerCase().includes(searchTerm);
        const matchingItems = person.items.filter(item => item.text.toLowerCase().includes(searchTerm));
        
        if (searchTerm && !matchesPerson && matchingItems.length === 0) {
            return;
        }

        if (isPersonCompleted(person)) {
            completedPeople.push(person);
        } else {
            pendingPeople.push(person);
        }
    });

    let draggedPersonId = null;
    let draggedGroup = null; // 'pending' | 'completed'

    const createPersonCard = (person, isReady, cardIndex = 0) => {
        hasVisibleContent = true;

        const pendingItems = person.items.filter(item => !item.completed);
        const completedItems = person.items.filter(item => item.completed);

        totalItemsCount += person.items.length;
        totalCompletedCount += completedItems.length;

        const groupType = isReady ? 'completed' : 'pending';

        // Mayor contraste definido entre tarjetas principales y bordes nítidos
        const cardBgClass = isReady 
            ? 'bg-[#151a23] border-[#313c4c]' 
            : (cardIndex % 2 === 0 ? 'bg-[#202735] border-[#445269]' : 'bg-[#18202d] border-[#38465b]');

        // Card wrapper con esquinas menos redondeadas (rounded-lg), bordes más nítidos y contraste elevado
        const card = document.createElement('div');
        card.className = `${cardBgClass} border-2 rounded-lg p-4 shadow-md transition-all hover:border-brand-teal/70 ${isReady ? 'opacity-60 hover:opacity-85' : ''}`;
        card.setAttribute('draggable', 'true');
        card.dataset.personId = person.id;
        card.dataset.group = groupType;

        // Eventos Drag and Drop
        card.addEventListener('dragstart', (e) => {
            draggedPersonId = person.id;
            draggedGroup = groupType;
            card.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', person.id);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            document.querySelectorAll('#lists-container > div').forEach(el => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });
            draggedPersonId = null;
            draggedGroup = null;
        });

        card.addEventListener('dragover', (e) => {
            if (draggedGroup !== groupType || draggedPersonId === person.id) {
                return;
            }
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const rect = card.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            if (e.clientY < midpoint) {
                card.classList.add('drag-over-top');
                card.classList.remove('drag-over-bottom');
            } else {
                card.classList.add('drag-over-bottom');
                card.classList.remove('drag-over-top');
            }
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over-top', 'drag-over-bottom');
        });

        card.addEventListener('drop', (e) => {
            if (draggedGroup !== groupType || draggedPersonId === person.id) {
                return;
            }
            e.preventDefault();
            card.classList.remove('drag-over-top', 'drag-over-bottom');

            const rect = card.getBoundingClientRect();
            const placeBefore = e.clientY < (rect.top + rect.height / 2);

            reorderPersonInGroup(draggedPersonId, person.id, placeBefore, groupType);
        });

        // Header de persona con agarradera (drag handle)
        let html = `
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2.5 flex-1 min-w-0 mr-2">
                    <div class="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 p-1 -ml-1 transition" title="Arrastrar para ordenar">
                        <i class="fa-solid fa-grip-vertical text-xs"></i>
                    </div>
                    <div class="w-8 h-8 rounded-md ${isReady ? 'bg-darkcard text-accent-green border border-accent-green/30' : 'bg-brand-tealBg text-brand-tealLight border border-brand-tealBorder'} flex items-center justify-center font-semibold text-sm shrink-0">
                        ${isReady ? '<i class="fa-solid fa-check text-xs"></i>' : person.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 class="font-medium text-white text-base truncate" title="${escapeHtml(person.name)}">${escapeHtml(person.name)}</h2>
                    <span class="inline-flex items-center gap-1 text-[11px] font-normal px-2 py-0.5 rounded ${isReady ? 'bg-accent-greenBg text-accent-green border border-accent-green/30' : 'bg-darkcard text-slate-300 border border-darkborder'} shrink-0">
                        <i class="fa-solid fa-circle-check text-[9px] ${isReady ? 'text-accent-green' : 'text-slate-400'}"></i>
                        ${completedItems.length}/${person.items.length}
                    </span>
                </div>
                <div class="flex items-center space-x-1 shrink-0">
                    <button onclick="openAddItemModal('${person.id}')" title="Agregar elemento" class="w-8 h-8 rounded-md bg-brand-tealBg text-brand-tealLight hover:bg-brand-teal hover:text-white border border-brand-tealBorder flex items-center justify-center transition text-xs">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button onclick="openEditPersonModal('${person.id}')" title="Editar nombre" class="w-8 h-8 rounded-md text-slate-400 hover:text-slate-200 bg-darkcard hover:bg-slate-700/50 border border-darkborder flex items-center justify-center transition text-xs">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onclick="deletePerson('${person.id}')" title="Eliminar persona" class="w-8 h-8 rounded-md text-slate-400 hover:text-rose-400 bg-darkcard hover:bg-rose-950/40 border border-darkborder hover:border-rose-900/60 flex items-center justify-center transition text-xs">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;

        // Lista de pendientes sin fondo más oscuro que la tarjeta principal
        html += `<div class="space-y-2 mb-2">`;
        
        const itemsToDisplay = searchTerm ? person.items.filter(i => i.text.toLowerCase().includes(searchTerm)) : pendingItems;

        if (!searchTerm && pendingItems.length === 0 && completedItems.length === 0) {
            html += `<p class="text-xs text-slate-400 py-3 text-center rounded-md border border-dashed border-white/10">Sin elementos. Pulsa + para agregar.</p>`;
        } else if (searchTerm && itemsToDisplay.length === 0) {
            html += `<p class="text-xs text-slate-400 italic py-2 text-center">Sin coincidencias</p>`;
        }

        const activeList = searchTerm ? itemsToDisplay.filter(i => !i.completed) : pendingItems;
        activeList.forEach(item => {
            html += `
                <div class="group flex items-center justify-between p-2.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-teal/50 transition">
                    <label class="flex items-center space-x-3 flex-1 cursor-pointer min-w-0 mr-2">
                        <input type="checkbox" onchange="toggleItem('${person.id}', '${item.id}')" class="w-4 h-4 rounded border-white/20 text-brand-teal focus:ring-0 bg-transparent cursor-pointer shrink-0">
                        <span class="text-sm text-slate-100 truncate font-light" title="${escapeHtml(item.text)}">${escapeHtml(item.text)}</span>
                    </label>
                    <div class="flex items-center space-x-1 opacity-70 group-hover:opacity-100 shrink-0">
                        <button onclick="openEditItemModal('${person.id}', '${item.id}')" class="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded transition text-xs"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="deleteItem('${person.id}', '${item.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition text-xs"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            `;
        });
        html += `</div>`;

        // Sección de completados (Estilo acordeón ordenado con contornos discretos)
        const completedListToDisplay = searchTerm ? itemsToDisplay.filter(i => i.completed) : completedItems;
        if (completedListToDisplay.length > 0 && !searchTerm) {
            const isCollapsed = collapsedCompleted[person.id] !== false;
            html += `
                <div class="mt-3 pt-2.5 border-t border-white/10">
                    <button onclick="toggleCompletedAccordion('${person.id}')" class="w-full flex items-center justify-between text-xs font-medium text-slate-400 hover:text-slate-200 py-1 transition">
                        <span class="flex items-center gap-1.5">
                            <i class="fa-solid fa-chevron-${isCollapsed ? 'right' : 'down'} text-[10px] text-slate-400"></i>
                            <span class="inline-flex items-center gap-1 text-[11px] font-normal px-1.5 py-0.5 rounded bg-accent-greenBg text-accent-green border border-accent-green/30">
                                <i class="fa-solid fa-check text-[9px]"></i> ${completedItems.length}
                            </span>
                            <span>elemento${completedItems.length > 1 ? 's' : ''} completado${completedItems.length > 1 ? 's' : ''}</span>
                        </span>
                    </button>
                    <div class="space-y-2 mt-2 ${isCollapsed ? 'hidden' : ''}">
            `;

            completedItems.forEach(item => {
                html += `
                    <div class="group flex items-center justify-between p-2.5 rounded-md bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 opacity-80 hover:opacity-100 transition">
                        <label class="flex items-center space-x-3 flex-1 cursor-pointer min-w-0 mr-2">
                            <input type="checkbox" checked onchange="toggleItem('${person.id}', '${item.id}')" class="w-4 h-4 rounded border-white/20 text-accent-orange focus:ring-0 bg-transparent cursor-pointer shrink-0">
                            <span class="text-sm text-slate-400 line-through truncate font-light" title="${escapeHtml(item.text)}">${escapeHtml(item.text)}</span>
                        </label>
                        <div class="flex items-center space-x-1 opacity-70 group-hover:opacity-100 shrink-0">
                            <button onclick="openEditItemModal('${person.id}', '${item.id}')" class="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/10 rounded transition text-xs"><i class="fa-solid fa-pen"></i></button>
                            <button onclick="deleteItem('${person.id}', '${item.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition text-xs"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
        } else if (searchTerm && completedListToDisplay.length > 0) {
            completedListToDisplay.forEach(item => {
                html += `
                    <div class="group flex items-center justify-between p-2.5 rounded-md bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 opacity-80 mt-2">
                        <label class="flex items-center space-x-3 flex-1 cursor-pointer min-w-0 mr-2">
                            <input type="checkbox" checked onchange="toggleItem('${person.id}', '${item.id}')" class="w-4 h-4 rounded border-white/20 text-accent-orange focus:ring-0 bg-transparent cursor-pointer shrink-0">
                            <span class="text-sm text-slate-400 line-through truncate font-light">${escapeHtml(item.text)}</span>
                        </label>
                        <button onclick="deleteItem('${person.id}', '${item.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition text-xs"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                `;
            });
        }

        card.innerHTML = html;
        return card;
    };

    // Renderizar primero los pendientes con índice alternado
    pendingPeople.forEach((person, idx) => {
        container.appendChild(createPersonCard(person, false, idx));
    });

    // Línea divisora si existen tarjetas completadas y pendientes
    if (completedPeople.length > 0) {
        if (pendingPeople.length > 0) {
            const divider = document.createElement('div');
            divider.id = "completed-section";
            divider.className = "flex items-center gap-3 py-3 my-2 scroll-mt-20";
            divider.innerHTML = `
                <div class="flex-1 h-px bg-darkborder"></div>
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-check text-accent-green text-[11px]"></i> Listas completadas (${completedPeople.length})
                </span>
                <div class="flex-1 h-px bg-darkborder"></div>
            `;
            container.appendChild(divider);
        }

        // Renderizar las personas que ya están listas
        completedPeople.forEach((person, idx) => {
            const completedCard = createPersonCard(person, true, idx);
            if (idx === 0 && pendingPeople.length === 0) {
                completedCard.id = "completed-section";
                completedCard.classList.add('scroll-mt-20');
            }
            container.appendChild(completedCard);
        });
    }

    // Actualizar barra de progreso global y estadísticas
    const globalPercent = totalItemsCount > 0 ? Math.round((totalCompletedCount / totalItemsCount) * 100) : 0;
    document.getElementById('global-progress-bar').style.width = globalPercent + '%';
    document.getElementById('global-progress-text').innerText = globalPercent + '%';
    document.getElementById('stats-total').innerText = `Total ítems: ${totalItemsCount}`;
    document.getElementById('stats-completed').innerHTML = `<i class="fa-solid fa-check-double text-[11px] mr-1"></i> Comprados: ${totalCompletedCount}`;

    if (!hasVisibleContent) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

function scrollToCompleted() {
    const target = document.getElementById('completed-section');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        showToast("No hay listas completadas aún");
    }
}

function reorderPersonInGroup(sourceId, targetId, placeBefore, groupType) {
    const isPersonCompleted = (p) => p.items.length > 0 && p.items.every(i => i.completed);

    const pending = state.filter(p => !isPersonCompleted(p));
    const completed = state.filter(p => isPersonCompleted(p));

    const listToReorder = groupType === 'completed' ? completed : pending;

    const fromIndex = listToReorder.findIndex(p => p.id === sourceId);
    let toIndex = listToReorder.findIndex(p => p.id === targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [movedPerson] = listToReorder.splice(fromIndex, 1);

    toIndex = listToReorder.findIndex(p => p.id === targetId);
    const insertIndex = placeBefore ? toIndex : toIndex + 1;
    listToReorder.splice(insertIndex, 0, movedPerson);

    if (groupType === 'completed') {
        state = [...pending, ...listToReorder];
    } else {
        state = [...listToReorder, ...completed];
    }

    saveState();
}

function toggleItem(personId, itemId) {
    const person = state.find(p => p.id === personId);
    if (person) {
        const item = person.items.find(i => i.id === itemId);
        if (item) {
            item.completed = !item.completed;
            saveState();
        }
    }
}

function toggleCompletedAccordion(personId) {
    collapsedCompleted[personId] = collapsedCompleted[personId] === false ? true : false;
    render();
}

let allExpanded = false;
function toggleExpandAll() {
    allExpanded = !allExpanded;
    state.forEach(p => {
        collapsedCompleted[p.id] = !allExpanded;
    });
    render();
}

function filterLists() {
    render();
}

function openAddPersonModal() {
    modalConfig = { type: 'add_person', personId: null };
    document.getElementById('modal-title').innerText = 'Nueva Persona / Categoría';
    document.getElementById('modal-body').innerHTML = `
        <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Nombre de la Persona</label>
            <input type="text" id="modal-input-1" required placeholder="Ej. Carlos, Mamá, Souvenirs..." class="w-full px-3.5 py-2.5 bg-darkinput border border-darkborder rounded-lg text-sm focus:outline-none focus:border-brand-teal text-white placeholder-slate-500 font-normal">
        </div>
    `;
    document.getElementById('modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('modal-input-1').focus(), 50);
}

function openEditPersonModal(personId) {
    const person = state.find(p => p.id === personId);
    if (!person) return;
    modalConfig = { type: 'edit_person', personId: personId };
    document.getElementById('modal-title').innerText = 'Editar Nombre';
    document.getElementById('modal-body').innerHTML = `
        <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Nombre</label>
            <input type="text" id="modal-input-1" required value="${escapeHtml(person.name)}" class="w-full px-3.5 py-2.5 bg-darkinput border border-darkborder rounded-lg text-sm focus:outline-none focus:border-brand-teal text-white font-normal">
        </div>
    `;
    document.getElementById('modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('modal-input-1').focus(), 50);
}

function openAddItemModal(personId) {
    modalConfig = { type: 'add_item', personId: personId };
    document.getElementById('modal-title').innerText = 'Nuevo Artículo';
    document.getElementById('modal-body').innerHTML = `
        <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Descripción del Artículo</label>
            <input type="text" id="modal-input-1" required placeholder="Ej. Camisa, Reloj, Manga..." class="w-full px-3.5 py-2.5 bg-darkinput border border-darkborder rounded-lg text-sm focus:outline-none focus:border-brand-teal text-white placeholder-slate-500 font-normal">
        </div>
    `;
    document.getElementById('modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('modal-input-1').focus(), 50);
}

function openEditItemModal(personId, itemId) {
    const person = state.find(p => p.id === personId);
    if (!person) return;
    const item = person.items.find(i => i.id === itemId);
    if (!item) return;

    modalConfig = { type: 'edit_item', personId: personId, itemId: itemId };
    document.getElementById('modal-title').innerText = 'Editar Artículo';
    document.getElementById('modal-body').innerHTML = `
        <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Descripción</label>
            <input type="text" id="modal-input-1" required value="${escapeHtml(item.text)}" class="w-full px-3.5 py-2.5 bg-darkinput border border-darkborder rounded-lg text-sm focus:outline-none focus:border-brand-teal text-white font-normal">
        </div>
    `;
    document.getElementById('modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('modal-input-1').focus(), 50);
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function handleModalSubmit(e) {
    e.preventDefault();
    const val = document.getElementById('modal-input-1').value.trim();
    if (!val) return;

    if (modalConfig.type === 'add_person') {
        const newPerson = {
            id: 'p_' + Date.now(),
            name: val,
            items: []
        };
        state.push(newPerson);
        showToast("Persona agregada");
    } else if (modalConfig.type === 'edit_person') {
        const person = state.find(p => p.id === modalConfig.personId);
        if (person) {
            person.name = val;
            showToast("Nombre actualizado");
        }
    } else if (modalConfig.type === 'add_item') {
        const person = state.find(p => p.id === modalConfig.personId);
        if (person) {
            person.items.push({
                id: 'i_' + Date.now(),
                text: val,
                completed: false
            });
            showToast("Artículo agregado");
        }
    } else if (modalConfig.type === 'edit_item') {
        const person = state.find(p => p.id === modalConfig.personId);
        if (person) {
            const item = person.items.find(i => i.id === modalConfig.itemId);
            if (item) {
                item.text = val;
                showToast("Artículo actualizado");
            }
        }
    }

    closeModal();
    saveState();
}

function deletePerson(personId) {
    if (confirm("¿Estás seguro de eliminar esta persona y todos sus artículos?")) {
        state = state.filter(p => p.id !== personId);
        saveState();
        showToast("Persona eliminada");
    }
}

function deleteItem(personId, itemId) {
    const person = state.find(p => p.id === personId);
    if (person) {
        person.items = person.items.filter(i => i.id !== itemId);
        saveState();
        showToast("Artículo eliminado");
    }
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 2500);
}

// Inicializar al cargar el DOM o ventana
window.addEventListener('DOMContentLoaded', () => {
    loadState();
    render();
});
