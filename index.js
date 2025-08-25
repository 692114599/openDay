 // 导航栏滚动效果
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('py-2', 'shadow');
                navbar.classList.remove('py-4');
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                navbar.classList.add('py-4');
                navbar.classList.remove('py-2', 'shadow');
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        });
        
        // 移动端菜单切换
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 轮播功能
        const carousel = document.getElementById('carousel');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        let currentSlide = 0;
        let slideInterval;
        
        // 初始化轮播
        function initCarousel() {
            showSlide(currentSlide);
            startSlideInterval();
            // 添加触摸滑动支持
            addSwipeSupport(carousel, prevSlide, nextSlide);
        }
        
        // 显示指定幻灯片
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.opacity = '1';
                    slide.style.zIndex = '1';
                } else {
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                }
            });
            
            // 更新指示器
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.style.opacity = '1';
                } else {
                    indicator.style.opacity = '0.5';
                }
            });
        }
        
        // 下一张幻灯片
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // 上一张幻灯片
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // 开始轮播定时器
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // 停止轮播定时器
        function stopSlideInterval() {
            clearInterval(slideInterval);
        }
        
        // 轮播事件监听
        prevBtn.addEventListener('click', () => {
            stopSlideInterval();
            prevSlide();
            startSlideInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            stopSlideInterval();
            nextSlide();
            startSlideInterval();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopSlideInterval();
                currentSlide = index;
                showSlide(currentSlide);
                startSlideInterval();
            });
        });
        
        // 鼠标悬停暂停轮播
        carousel.addEventListener('mouseenter', stopSlideInterval);
        carousel.addEventListener('mouseleave', startSlideInterval);
        
        // 作品筛选功能
        const filterBtns = document.querySelectorAll('.filter-btn');
        const workItems = document.querySelectorAll('.work-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 更新按钮样式
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-primary', 'text-white');
                    b.classList.add('bg-gray-200', 'hover:bg-gray-300');
                });
                btn.classList.add('active', 'bg-primary', 'text-white');
                btn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
                
                const filter = btn.getAttribute('data-filter');
                
                // 筛选作品
                workItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        // 添加动画效果
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // 视频播放功能
        const videoModal = document.getElementById('video-modal');
        const modalVideo = document.getElementById('modal-video');
        const videoSource = document.getElementById('video-source');
        const videoTitle = document.getElementById('video-title');
        const videoDescription = document.getElementById('video-description');
        const closeModal = document.getElementById('close-modal');
        
        // 打开视频模态框
        function openVideoModal(videoUrl, title, description) {
            videoSource.src = videoUrl;
            modalVideo.load();
            videoTitle.textContent = title;
            videoDescription.textContent = description;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }
        
        // 关闭视频模态框
        function closeVideoModal() {
            videoModal.classList.remove('active');
            modalVideo.pause();
            document.body.style.overflow = ''; // 恢复背景滚动
        }
        
        // 为作品项添加点击事件
        workItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoUrl = item.getAttribute('data-video');
                const title = item.getAttribute('data-title');
                const description = item.getAttribute('data-description');
                if (videoUrl) {
                    openVideoModal(videoUrl, title, description);
                }
            });
        });
        
        // 关闭模态框事件
        closeModal.addEventListener('click', closeVideoModal);
        
        // 点击模态框背景关闭
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // 按ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
        
        // 客户好评轮播
        const testimonialSlider = document.getElementById('testimonial-slider');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const prevTestimonial = document.getElementById('prev-testimonial');
        const nextTestimonial = document.getElementById('next-testimonial');
        const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
        let currentTestimonial = 0;
        let testimonialInterval;
        
        // 初始化好评轮播
        function initTestimonialCarousel() {
            updateTestimonialSlider();
            startTestimonialInterval();
            // 添加触摸滑动支持
            addSwipeSupport(document.getElementById('testimonial-carousel'), prevTestimonialSlide, nextTestimonialSlide);
        }
        
        // 更新轮播位置
        function updateTestimonialSlider() {
            let slideWidth = 100;
            if (window.innerWidth >= 1024) {
                slideWidth = 33.333; // 大屏幕显示3个
            } else if (window.innerWidth >= 768) {
                slideWidth = 50; // 中屏幕显示2个
            }
            
            const offset = -currentTestimonial * slideWidth;
            testimonialSlider.style.transform = `translateX(${offset}%)`;
            
            // 更新指示器
            testimonialIndicators.forEach((indicator, i) => {
                if (i === currentTestimonial) {
                    indicator.classList.remove('bg-gray-300');
                    indicator.classList.add('bg-primary');
                } else {
                    indicator.classList.remove('bg-primary');
                    indicator.classList.add('bg-gray-300');
                }
            });
        }
        
        // 下一个好评
        function nextTestimonialSlide() {
            let maxIndex = testimonialSlides.length - 1;
            if (window.innerWidth >= 1024) {
                maxIndex = testimonialSlides.length - 3;
            } else if (window.innerWidth >= 768) {
                maxIndex = testimonialSlides.length - 2;
            }
            
            currentTestimonial = currentTestimonial >= maxIndex ? 0 : currentTestimonial + 1;
            updateTestimonialSlider();
        }
        
        // 上一个好评
        function prevTestimonialSlide() {
            let maxIndex = testimonialSlides.length - 1;
            if (window.innerWidth >= 1024) {
                maxIndex = testimonialSlides.length - 3;
            } else if (window.innerWidth >= 768) {
                maxIndex = testimonialSlides.length - 2;
            }
            
            currentTestimonial = currentTestimonial <= 0 ? maxIndex : currentTestimonial - 1;
            updateTestimonialSlider();
        }
        
        // 开始好评轮播定时器
        function startTestimonialInterval() {
            testimonialInterval = setInterval(nextTestimonialSlide, 6000);
        }
        
        // 停止好评轮播定时器
        function stopTestimonialInterval() {
            clearInterval(testimonialInterval);
        }
        
        // 好评轮播事件监听
        prevTestimonial.addEventListener('click', () => {
            stopTestimonialInterval();
            prevTestimonialSlide();
            startTestimonialInterval();
        });
        
        nextTestimonial.addEventListener('click', () => {
            stopTestimonialInterval();
            nextTestimonialSlide();
            startTestimonialInterval();
        });
        
        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopTestimonialInterval();
                currentTestimonial = index;
                updateTestimonialSlider();
                startTestimonialInterval();
            });
        });
        
        // 公司环境轮播
        const envCarousel = document.getElementById('environment-carousel');
        const envSlides = envCarousel.querySelectorAll('.env-slide');
        const prevEnv = document.getElementById('prev-env');
        const nextEnv = document.getElementById('next-env');
        const envIndicators = document.querySelectorAll('.env-indicator');
        let currentEnv = 0;
        let envInterval;
        
        // 初始化环境轮播
        function initEnvCarousel() {
            // 移除所有内联样式
            envSlides.forEach(slide => {
                slide.removeAttribute('style');
            });
            envIndicators.forEach(indicator => {
                indicator.removeAttribute('style');
            });
            
            // 确保初始状态正确
            envSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === 0);
            });
            
            envIndicators.forEach((indicator, i) => {
                indicator.style.opacity = i === 0 ? '1' : '0.5';
            });
            
            startEnvInterval();
            // 添加触摸滑动支持
            addSwipeSupport(envCarousel, prevEnvSlide, nextEnvSlide);
        }
        
        // 显示指定环境幻灯片
        function showEnvSlide(index) {
            envSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            
            // 更新环境轮播指示器
            envIndicators.forEach((indicator, i) => {
                indicator.style.opacity = i === index ? '1' : '0.5';
            });
        }
        
        // 下一张环境幻灯片
        function nextEnvSlide() {
            currentEnv = (currentEnv + 1) % envSlides.length;
            showEnvSlide(currentEnv);
        }
        
        // 上一张环境幻灯片
        function prevEnvSlide() {
            currentEnv = (currentEnv - 1 + envSlides.length) % envSlides.length;
            showEnvSlide(currentEnv);
        }
        
        // 开始环境轮播定时器
        function startEnvInterval() {
            envInterval = setInterval(nextEnvSlide, 4000);
        }
        
        // 停止环境轮播定时器
        function stopEnvInterval() {
            clearInterval(envInterval);
        }
        
        // 环境轮播事件监听
        prevEnv.addEventListener('click', () => {
            stopEnvInterval();
            prevEnvSlide();
            startEnvInterval();
        });
        
        nextEnv.addEventListener('click', () => {
            stopEnvInterval();
            nextEnvSlide();
            startEnvInterval();
        });
        
        envIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopEnvInterval();
                currentEnv = index;
                showEnvSlide(currentEnv);
                startEnvInterval();
            });
        });
        
        // 鼠标悬停暂停环境轮播
        envCarousel.addEventListener('mouseenter', stopEnvInterval);
        envCarousel.addEventListener('mouseleave', startEnvInterval);
        
        // 添加触摸滑动支持
        function addSwipeSupport(element, prevFunc, nextFunc) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            element.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
                // 触摸开始时暂停自动播放
                if (element.id === 'carousel') stopSlideInterval();
                if (element.id === 'testimonial-carousel') stopTestimonialInterval();
                if (element.id === 'environment-carousel') stopEnvInterval();
            }, false);
            
            element.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                // 触摸结束后恢复自动播放
                if (element.id === 'carousel') startSlideInterval();
                if (element.id === 'testimonial-carousel') startTestimonialInterval();
                if (element.id === 'environment-carousel') startEnvInterval();
            }, false);
            
            function handleSwipe() {
                const swipeThreshold = 50; // 最小滑动距离
                if (touchEndX - touchStartX > swipeThreshold) {
                    // 向右滑动，显示上一个
                    prevFunc();
                } else if (touchStartX - touchEndX > swipeThreshold) {
                    // 向左滑动，显示下一个
                    nextFunc();
                }
            }
        }
        
        // 窗口大小变化时更新好评轮播
        window.addEventListener('resize', updateTestimonialSlider);
        
        // 返回顶部功能
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 初始化页面
        window.addEventListener('DOMContentLoaded', () => {
            initCarousel();
            initTestimonialCarousel();
            initEnvCarousel(); // 初始化公司环境轮播
            
            // 为导航链接添加点击关闭移动菜单功能
            const navLinks = document.querySelectorAll('#mobile-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
            
            // 添加滚动动画
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('section > div > div.text-center');
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add('fade-in');
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // 初始检查
        });