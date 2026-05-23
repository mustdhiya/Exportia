/**
 * Exportia Global Navigation OS Layer (Extended)
 * Injects a persistent, glassmorphism Floating Action Button (FAB) across all platform nodes.
 */

(function () {
    // Prevent duplicate injection
    if (document.getElementById('exportia-os-fab')) return;

    // Define Navigation Modules (Extended Complete Directory)
    const navModules = [
        { name: "Home Terminal", url: "index.html", icon: "home" },
        { name: "Buyer Dashboard", url: "Buyer_Dashboard.html", icon: "travel_explore" },
        { name: "Supplier Dashboard", url: "Supplier_Dashboard.html", icon: "factory" },
        { name: "Supplier Directory", url: "Supplier_direcpage.html", icon: "view_list" },
        { name: "Company Profiles", url: "Supplier_compro.html", icon: "business" },
        { name: "Become a Supplier", url: "Supplier_become.html", icon: "storefront" },
        { name: "Verification Center", url: "Verification_Certification.html", icon: "verified" },
        { name: "Export Intelligence", url: "Export_Intelligence.html", icon: "query_stats" },
        { name: "Export Academy", url: "Export_Academy.html", icon: "school" },
        { name: "Export Services", url: "Export_Services.html", icon: "handshake" },
        { name: "Success Stories", url: "Success_Stories.html", icon: "military_tech" },
        { name: "Detail Inspection", url: "detail.html", icon: "inventory_2" }
    ];

    // Determine current active page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Inject required CSS directly to bypass potential Tailwind JIT compilation limits
    const style = document.createElement('style');
    style.innerHTML = `
        /* Exportia FAB OS Base Styles */
        #exportia-os-fab {
            position: fixed;
            bottom: 32px;
            right: 32px;
            z-index: 999999;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 16px;
        }

        /* Glassmorphism System */
        .fab-glass-strong {
            background: rgba(5, 8, 18, 0.85);
            backdrop-filter: blur(32px) saturate(200%);
            -webkit-backdrop-filter: blur(32px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Animations & States */
        .fab-menu {
            width: 280px;
            max-height: 65vh; /* Prevents overflow on large lists */
            overflow-y: auto;
            border-radius: 24px;
            padding: 12px;
            transform-origin: bottom right;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: scale(0.9) translateY(20px);
            pointer-events: none;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        
        /* Custom Scrollbar for Menu */
        .fab-menu::-webkit-scrollbar { width: 4px; }
        .fab-menu::-webkit-scrollbar-track { background: transparent; }
        .fab-menu::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 4px; }
        .fab-menu::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }

        .fab-menu.is-active {
            opacity: 1;
            transform: scale(1) translateY(0);
            pointer-events: auto;
        }

        /* Menu Items */
        .fab-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            color: #94a3b8; /* text-slate-400 */
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.025em;
            transition: all 0.2s ease;
            border-radius: 14px;
            border: 1px solid transparent;
            margin-bottom: 2px;
        }
        .fab-link:hover {
            background: rgba(255, 255, 255, 0.05);
            color: #f8fafc; /* text-slate-50 */
            border-color: rgba(255, 255, 255, 0.05);
        }
        
        /* Active Route Glow Indicator */
        .fab-link.route-active {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
            color: #60a5fa; /* text-blue-400 */
            box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.05);
        }

        /* Toggle Button */
        .fab-toggle-btn {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f8fafc;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(15, 23, 42, 0.8); /* slate-900 */
            backdrop-filter: blur(16px);
        }
        .fab-toggle-btn:hover {
            box-shadow: 0 0 24px rgba(59, 130, 246, 0.2);
            border-color: rgba(59, 130, 246, 0.4);
            transform: scale(1.05);
        }
        .fab-toggle-btn.is-active {
            transform: rotate(45deg);
            background: rgba(59, 130, 246, 0.15);
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
            color: #60a5fa;
        }

        /* Material Symbols Integration */
        .material-symbols-rounded {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            font-size: 20px;
        }
        .fab-toggle-btn .material-symbols-rounded {
            font-size: 28px;
        }

        @media (max-width: 640px) {
            #exportia-os-fab { bottom: 20px; right: 20px; }
            .fab-toggle-btn { width: 56px; height: 56px; }
            .fab-menu { width: calc(100vw - 40px); max-height: 60vh; }
        }
    `;
    document.head.appendChild(style);

    // Build the DOM Structure
    const container = document.createElement('div');
    container.id = 'exportia-os-fab';

    const menu = document.createElement('div');
    menu.className = 'fab-menu fab-glass-strong';

    // Header for Menu
    const menuHeader = document.createElement('div');
    menuHeader.innerHTML = `<span style="display:block; padding: 4px 16px 12px; font-size: 10px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; position: sticky; top: 0; background: inherit; z-index: 2;">Global OS Navigation</span>`;
    menu.appendChild(menuHeader);

    // Populate Links
    navModules.forEach(module => {
        const link = document.createElement('a');
        link.href = module.url;
        
        // Check exact match for active logic
        const isActive = currentPath === module.url;
        link.className = `fab-link ${isActive ? 'route-active' : ''}`;
        
        link.innerHTML = `
            <span class="material-symbols-rounded">${module.icon}</span>
            ${module.name}
        `;
        
        // Smooth interaction effect
        link.addEventListener('click', (e) => {
            link.style.transform = 'scale(0.98)';
        });

        menu.appendChild(link);
    });

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'fab-toggle-btn';
    toggleBtn.innerHTML = `<span class="material-symbols-rounded">bolt</span>`;

    // Interaction Logic
    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
        if (isOpen) {
            menu.classList.add('is-active');
            toggleBtn.classList.add('is-active');
        } else {
            menu.classList.remove('is-active');
            toggleBtn.classList.remove('is-active');
        }
    };

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !container.contains(e.target)) {
            toggleMenu();
        }
    });

    // Append to DOM
    container.appendChild(menu);
    container.appendChild(toggleBtn);
    document.body.appendChild(container);

})();