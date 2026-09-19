// MOCK DATABASE / ARTICLES DATA
        const articlesData = [
            {
                id: 1,
                title: "مستقبل نماذج الذكاء الاصطناعي التوليدي في التنبؤ بالطقس والمناخ",
                category: "ذكاء اصطناعي",
                date: "19 سبتمبر 2026",
                readTime: "4 دقائق",
                author: "سارة الأحمد",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
                featured: true,
                views: 1420,
                excerpt: "تطور حاد شهدته نماذج الذكاء الاصطناعي في تحليل أنماط الطقس المعقدة والتنبؤ بالعواصف قبل حدوثها بأيام بكفاءة عالية.",
                content: `
                    <p class="lead font-semibold text-base text-gray-800 dark:text-gray-200">أحدثت تقنيات التعلم العميق ونماذج الذكاء الاصطناعي التوليدي ثورة حقيقية في أساليب التنبؤ بالأرصاد الجوية ورصد التحولات المناخية عبر العالم.</p>
                    <p>في السنوات الأخيرة، اعتمدت مراكز الأرصاد العالمية على حواسيب فائقة التعقيد لحساب معادلات أتمتة الطقس، ولكن دخول خوارزميات المساعدات الرقمية ساهم في تسريع هذه العمليات بمعدل 1000 ضعف مقارنة بالطرق التقليدية.</p>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">كيف تعمل الخوارزميات الجديدة؟</h3>
                    <p>تقوم النماذج بتحليل عقود من البيانات المناخية التاريخية، وربط حركة الرياح والضغط الجوي ودرجات حرارة المحيطات بدقة عالية جداً. هذا يتيح بناء نماذج تنبؤ لحظية توفر حماية أكبر للمجتمعات الساحلية والزراعية.</p>
                    <blockquote class="border-r-4 border-brand-600 pr-4 italic my-4 text-gray-600 dark:text-gray-400 font-medium">
                        "إن الذكاء الاصطناعي لا يستبدل علماء الأرصاد، بل يمنحهم أداة فائقة القوة للتنبؤ بالكوارث الطبيعية قبل وقوعها بوقت كافٍ."
                    </blockquote>
                    <p>ومن المتوقع خلال السنوات القادمة أن تندمج هذه الأنظمة مع الهواتف الذكية والأجهزة الذكية لتنبيه الأفراد بدقة مترية حول تغييرات المناخ المحلية.</p>
                `
            },
            {
                id: 2,
                title: "المركبات الكهربائية الذكية: تقنيات البطاريات الصليبة تغير اللعبة",
                category: "تقنية",
                date: "18 سبتمبر 2026",
                readTime: "6 دقائق",
                author: "محمد العتيبي",
                image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
                featured: true,
                views: 980,
                excerpt: "البطاريات بالحالة الصلبة تعد بنطاق قيادة يتجاوز 1000 كم وشحن أسرع خلال دقائق معدودة مما ينهي قلق النطاق نهائياً.",
                content: `
                    <p>تشهد صناعة السيارات الكهربائية تحولاً جذرياً بفضل اعتماد تقنيات بطاريات الحالة الصلبة. هذه التقنية الواعدة تتغلب على كافة عيوب بطاريات الليثيوم أيون التقليدية.</p>
                    <p>تسعى كبرى الشركات العالمية إلى تسريع الإنتاج التجاري لهذه البطاريات، والتي توفر كثافة طاقة مضاعفة وأماناً أعلى ضد أخطار الاشتعال.</p>
                `
            },
            {
                id: 3,
                title: "ارتفاع مؤشرات الأسواق المالية الشاملة مع انخفاض معدلات التضخم",
                category: "اقتصاد",
                date: "17 سبتمبر 2026",
                readTime: "3 دقائق",
                author: "عمر خالد",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
                featured: false,
                views: 2100,
                excerpt: "سجلت الأسواق المالية ارتفاعاً ملحوظاً عقب صدور تقارير التضخم الإيجابية التي طمأنت المستثمرين وحفزت حركة الاستثمار.",
                content: `
                    <p>أغلقت مؤشرات الأسهم العالمية على ارتفاع جماعي عقب صدور بيانات التضخم الأخيرة التي أظهرت تباطؤاً ملحوظاً، مما عزز التوقعات بخفض أسعار الفائدة في الأسابيع القادمة.</p>
                `
            },
            {
                id: 4,
                title: "انطلاق دوري الأبطال بحلته الجديدة: استعدادات الأندية والتحليلات",
                category: "رياضة",
                date: "16 سبتمبر 2026",
                readTime: "5 دقائق",
                author: "خالد بن طلال",
                image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
                featured: false,
                views: 3100,
                excerpt: "المباريات الافتتاحية للموسم الكروي تعود بإثارة كبيرة وتكتيكات متطورة تعتمد على تحليل البيانات والأداء الرياضي.",
                content: `
                    <p>تتجه أنظار عشاق كرة القدم حول العالم لمتابعة الانطلاقة النارية للبطولة الأهم على مستوى الأندية، وسط صفقات جديدة وتكتيكات مدربين مبهرة.</p>
                `
            },
            {
                id: 5,
                title: "تأثير القراءة الرقمية والتطبيقات الحديثة على الوعي الثقافي",
                category: "ثقافة",
                date: "15 سبتمبر 2026",
                readTime: "4 دقائق",
                author: "فاطمة الزهراء",
                image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80",
                featured: false,
                views: 750,
                excerpt: "دراسة جديدة تؤكد أن المنصات الرقمية والتطبيقات التفاعلية ساهمت في زيادة معدلات القراءة لدى الفئات الشابة.",
                content: `
                    <p>أظهرت دراسة حديثة أن الكتب الصوتية والتطبيقات الرقمية التفاعلية نجحت في جذب أجيال جديدة لعادة القراءة والاطلاع الثقافي المستمر.</p>
                `
            },
            {
                id: 6,
                title: "أمن المعلومات والأمن السيبراني في عصر الشبكات الفائقة",
                category: "تقنية",
                date: "14 سبتمبر 2026",
                readTime: "7 دقائق",
                author: "سارة الأحمد",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
                featured: false,
                views: 1890,
                excerpt: "استراتيجيات حديثة لحماية البيانات والمؤسسات في ظل التهديدات المتزايدة والهجمات المعتمدة على الذكاء الاصطناعي.",
                content: `
                    <p>تزايد الحاجه لتطبيق استراتيجيات الأمن السيبراني الصارمة وحماية الخصوصية الرقمية مع التوسع المستمر في خدمات السحابة والتحول الرقمي الكامل.</p>
                `
            }
        ];

        let currentActiveCategory = 'all';

        // INITIALIZATION
        window.addEventListener('DOMContentLoaded', () => {
            renderHeroSection();
            renderArticlesFeed(articlesData);
            renderPopularPosts();
            setupTheme();
        });

        // RENDER HERO SECTION
        function renderHeroSection() {
            const mainHeroCard = document.getElementById('main-hero-card');
            const sideHeroCards = document.getElementById('side-hero-cards');

            const heroArticles = articlesData.filter(a => a.featured || a.id <= 3);
            const main = heroArticles[0];
            const side1 = heroArticles[1];
            const side2 = heroArticles[2];

            if (main && mainHeroCard) {
                mainHeroCard.innerHTML = `
                    <img src="${main.image}" alt="${main.title}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div class="relative z-10 space-y-2">
                        <span class="bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-md inline-block mb-1">${main.category}</span>
                        <h3 class="text-xl sm:text-2xl font-bold hover:text-brand-300 transition-colors">${main.title}</h3>
                        <p class="text-xs text-gray-300 line-clamp-2">${main.excerpt}</p>
                        <div class="flex items-center gap-4 text-[11px] text-gray-400 pt-2">
                            <span><i class="fa-regular fa-user ml-1"></i> ${main.author}</span>
                            <span><i class="fa-regular fa-calendar ml-1"></i> ${main.date}</span>
                            <span><i class="fa-regular fa-eye ml-1"></i> ${main.views} مشاهدة</span>
                        </div>
                    </div>
                `;
                mainHeroCard.onclick = () => openArticle(main.id);
            }

            if (sideHeroCards) {
                sideHeroCards.innerHTML = [side1, side2].map(item => item ? `
                    <div onclick="openArticle(${item.id})" class="relative rounded-xl overflow-hidden shadow-md group cursor-pointer bg-gray-900 h-[160px] md:h-[200px] flex flex-col justify-end p-4 text-white">
                        <img src="${item.image}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div class="relative z-10 space-y-1">
                            <span class="bg-brand-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block">${item.category}</span>
                            <h4 class="text-xs sm:text-sm font-bold line-clamp-2 hover:text-brand-300 transition-colors">${item.title}</h4>
                            <span class="text-[10px] text-gray-400 block">${item.date}</span>
                        </div>
                    </div>
                ` : '').join('');
            }
        }

        // RENDER ARTICLES FEED
        function renderArticlesFeed(articles) {
            const feedContainer = document.getElementById('articles-feed');
            const countBadge = document.getElementById('article-count-badge');

            if (!feedContainer || !countBadge) return;
            countBadge.innerText = `${articles.length} مقالات`;

            if (articles.length === 0) {
                feedContainer.innerHTML = `
                    <div class="col-span-2 text-center py-12 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                        <i class="fa-solid fa-folder-open text-3xl text-gray-400 mb-2"></i>
                        <p class="text-sm font-bold text-gray-600 dark:text-gray-400">لم يتم العثور على مقالات في هذا القسم حالياً.</p>
                    </div>
                `;
                return;
            }

            feedContainer.innerHTML = articles.map(article => `
                <article onclick="openArticle(${article.id})" class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800 group cursor-pointer flex flex-col">
                    <div class="relative h-48 overflow-hidden">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-3 right-3 bg-brand-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">${article.category}</span>
                    </div>
                    <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
                        <div class="space-y-2">
                            <h3 class="text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">${article.title}</h3>
                            <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">${article.excerpt}</p>
                        </div>
                        <div class="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <span><i class="fa-regular fa-calendar ml-1"></i> ${article.date}</span>
                            <span><i class="fa-regular fa-clock ml-1"></i> ${article.readTime}</span>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        // RENDER POPULAR POSTS
        function renderPopularPosts() {
            const widget = document.getElementById('popular-posts-widget');
            if (!widget) return;
            const sorted = [...articlesData].sort((a, b) => b.views - a.views).slice(0, 4);

            widget.innerHTML = sorted.map((item, idx) => `
                <div onclick="openArticle(${item.id})" class="flex items-center gap-3 group cursor-pointer border-b border-gray-100 dark:border-gray-800/60 pb-3 last:border-none last:pb-0">
                    <span class="text-lg font-black text-brand-600/40 dark:text-brand-400/30 w-5 text-center">${idx + 1}</span>
                    <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-lg object-cover shrink-0">
                    <div>
                        <h5 class="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">${item.title}</h5>
                        <span class="text-[10px] text-gray-400 mt-1 block"><i class="fa-regular fa-eye ml-1"></i> ${item.views}</span>
                    </div>
                </div>
            `).join('');
        }

        // FILTER ARTICLES BY CATEGORY
        function filterCategory(category) {
            currentActiveCategory = category;
            
            // Update Active Tab Class
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active', 'text-brand-600', 'bg-brand-50', 'dark:bg-gray-800');
                if (btn.innerText.includes(category) || (category === 'all' && btn.innerText.includes('الرئيسية'))) {
                    btn.classList.add('active', 'text-brand-600', 'bg-brand-50', 'dark:bg-gray-800');
                }
            });

            const categoryTitle = document.getElementById('current-category-title');
            if (categoryTitle) categoryTitle.innerText = category === 'all' ? 'أحدث المقالات' : `قسم: ${category}`;

            showHomeView();

            if (category === 'all') {
                renderArticlesFeed(articlesData);
            } else {
                const filtered = articlesData.filter(a => a.category.toLowerCase().includes(category.toLowerCase()));
                renderArticlesFeed(filtered);
            }
        }

        // SEARCH FILTER
        function filterArticlesBySearch(query) {
            if (!query.trim()) {
                renderArticlesFeed(articlesData);
                return;
            }
            const filtered = articlesData.filter(a => 
                a.title.includes(query) || 
                a.excerpt.includes(query) || 
                a.category.includes(query)
            );
            showHomeView();
            renderArticlesFeed(filtered);
        }

        // OPEN SINGLE ARTICLE VIEW
        function openArticle(id) {
            const article = articlesData.find(a => a.id === id);
            if (!article) return;
            window.location.href = `blogs/post-${id}.html`;
            return;

            // Set Breadcrumbs
            document.getElementById('breadcrumb-category').innerText = article.category;
            document.getElementById('breadcrumb-title').innerText = article.title;

            // Set Content
            document.getElementById('article-category-badge').innerText = article.category;
            document.getElementById('article-title').innerText = article.title;
            document.getElementById('article-author-name').innerText = article.author;
            document.getElementById('article-date').innerHTML = `<i class="fa-regular fa-calendar ml-1"></i> ${article.date}`;
            document.getElementById('article-read-time').innerHTML = `<i class="fa-regular fa-clock ml-1"></i> ${article.readTime}`;
            document.getElementById('article-image').src = article.image;
            document.getElementById('article-body').innerHTML = article.content;

            // Render Related Articles
            renderRelatedArticles(article.category, article.id);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // SHOW HOMEPAGE VIEW
        function showHomeView() {
            if (window.location.pathname.includes('/blogs/') || window.location.pathname.includes('/pages/')) {
                window.location.href = '../index.html';
                return;
            }
            const articleView = document.getElementById('article-view');
            const homeView = document.getElementById('home-view');
            if (articleView) articleView.classList.add('hidden');
            if (homeView) homeView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // RENDER RELATED ARTICLES
        function renderRelatedArticles(category, currentId) {
            const grid = document.getElementById('related-articles-grid');
            if (!grid) return;
            const related = articlesData.filter(a => a.category === category && a.id !== currentId).slice(0, 2);

            if (related.length === 0) {
                grid.innerHTML = `<p class="text-xs text-gray-500 col-span-2">لا توجد مقالات أخرى في نفس القسم حالياً.</p>`;
                return;
            }

            grid.innerHTML = related.map(item => `
                <div onclick="openArticle(${item.id})" class="flex gap-3 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <img src="${item.image}" alt="${item.title}" class="w-20 h-20 rounded-lg object-cover shrink-0">
                    <div class="flex flex-col justify-between">
                        <h4 class="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 line-clamp-2">${item.title}</h4>
                        <span class="text-[10px] text-gray-400">${item.date}</span>
                    </div>
                </div>
            `).join('');
        }

        // DARK / LIGHT THEME TOGGLE
        function setupTheme() {
            const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
            const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
            const themeBtn = document.getElementById('theme-toggle');
            if (!themeToggleDarkIcon || !themeToggleLightIcon || !themeBtn) return;

            if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
                themeToggleLightIcon.classList.remove('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleDarkIcon.classList.remove('hidden');
            }

            themeBtn.addEventListener('click', function() {
                themeToggleDarkIcon.classList.toggle('hidden');
                themeToggleLightIcon.classList.toggle('hidden');

                if (localStorage.getItem('color-theme')) {
                    if (localStorage.getItem('color-theme') === 'light') {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('color-theme', 'dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('color-theme', 'light');
                    }
                } else {
                    if (document.documentElement.classList.contains('dark')) {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('color-theme', 'light');
                    } else {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('color-theme', 'dark');
                    }
                }
            });
        }

        // MOBILE MENU TOGGLE
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // MODAL MANAGEMENT
        function openModal(modalId) {
            const backdrop = document.getElementById('modal-backdrop');
            const modal = document.getElementById(modalId);
            if (backdrop) backdrop.classList.remove('hidden');
            if (modal) modal.classList.remove('hidden');
        }

        function closeModal(modalId) {
            const backdrop = document.getElementById('modal-backdrop');
            const modal = document.getElementById(modalId);
            if (backdrop) backdrop.classList.add('hidden');
            if (modal) modal.classList.add('hidden');
        }

        const modalBackdrop = document.getElementById('modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => {
                document.querySelectorAll('.modal-box').forEach(m => m.classList.add('hidden'));
                modalBackdrop.classList.add('hidden');
            });
        }

        // FORM HANDLERS
        function handleNewsletterSubmit(e) {
            e.preventDefault();
            showToast("شكراً لاشتراكك! تم تسجيل بريدك بنجاح.");
            e.target.reset();
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            const msg = document.getElementById('contact-success-msg');
            msg.classList.remove('hidden');
            setTimeout(() => {
                msg.classList.add('hidden');
                closeModal('contactModal');
                e.target.reset();
            }, 2000);
        }

        // SOCIAL SHARE & COPY LINK
        function shareArticle(platform) {
            const url = encodeURIComponent(window.location.href);
            let shareUrl = '';
            if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${url}`;
            if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
            if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            window.open(shareUrl, '_blank');
        }

        function copyArticleLink() {
            navigator.clipboard.writeText(window.location.href);
            showToast("تم نسخ رابط المقال بنجاح!");
        }

        // TOAST NOTIFICATION
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            toastMsg.innerText = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }
