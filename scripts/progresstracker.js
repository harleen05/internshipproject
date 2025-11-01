// Initialize from localStorage with 0% default
        function initializeProgress() {
            const savedProgress = localStorage.getItem('progressData');
            if (savedProgress) {
                const data = JSON.parse(savedProgress);
                Object.keys(data).forEach(id => {
                    const checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = data[id];
                    }
                });
            }
            updateAllProgress();
        }

        // Save progress to localStorage only when user checks/unchecks
        function saveProgress() {
            const progressData = {};
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                progressData[checkbox.id] = checkbox.checked;
            });
            localStorage.setItem('progressData', JSON.stringify(progressData));
        }

        // Calculate progress for a category
        function calculateCategoryProgress(selector) {
            const checkboxes = document.querySelectorAll(selector);
            if (checkboxes.length === 0) return 0;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            return Math.round((checked / checkboxes.length) * 100);
        }

        // Dynamic status text based on completion percentage
        function getStatusText(percentage) {
            if (percentage === 0) return "Just getting started! 🚀";
            if (percentage < 25) return "Good start! Keep going 💪";
            if (percentage < 50) return "Solid progress! You're on track 🎯";
            if (percentage < 75) return "Well-prepared! Almost there 🏆";
            return "Fully prepared for internship season! 🌟";
        }

        // Update all progress displays
        function updateAllProgress() {
            const categories = [
                { selector: '.dsa-checkbox', progressId: 'dsaProgress', fillId: 'dsaProgressFill', domainId: 'dsaFill', percentageId: 'dsaPercentage' },
                { selector: '.dev-checkbox', progressId: 'devProgress', fillId: 'devProgressFill', domainId: 'devFill', percentageId: 'devPercentage' },
                { selector: '.core-checkbox', progressId: 'coreProgress', fillId: 'coreProgressFill', domainId: 'coreFill', percentageId: 'corePercentage' },
                { selector: '.resume-checkbox', progressId: 'resumeProgress', fillId: 'resumeProgressFill', domainId: 'resumeFill', percentageId: 'resumePercentage' },
                { selector: '.interview-checkbox', progressId: 'interviewProgress', fillId: 'interviewProgressFill', domainId: 'interviewFill', percentageId: 'interviewPercentage' }
            ];

            let totalProgress = 0;

            categories.forEach(cat => {
                const progress = calculateCategoryProgress(cat.selector);
                totalProgress += progress;

                document.getElementById(cat.progressId).textContent = progress + '%';
                document.getElementById(cat.fillId).style.width = progress + '%';
                document.getElementById(cat.domainId).style.width = progress + '%';
                document.getElementById(cat.percentageId).textContent = progress + '%';
            });

            const overallProgress = Math.round(totalProgress / categories.length);
            document.getElementById('overallPercentage').textContent = overallProgress + '%';
            document.getElementById('overallProgressBar').style.width = overallProgress + '%';
            document.getElementById('overallProgressBar').textContent = overallProgress + '%';
            document.getElementById('statusText').textContent = getStatusText(overallProgress);
        }

        // Add event listeners to all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateAllProgress();
                saveProgress();
            });
        });

        // Goal card toggle functionality
        document.querySelectorAll('.goal-header').forEach(header => {
            header.addEventListener('click', () => {
                const card = header.parentElement;
                card.classList.toggle('active');
            });
        });

        // Initialize on page load
        window.addEventListener('load', initializeProgress);