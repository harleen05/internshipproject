//  Data structure and functionality for opportunities
      const opportunities = {
        '2nd': [
          { name: 'Google STEP', company: 'Google', details: 'Software Engineering Internship for 2nd year students', deadline: 'Feb 2025', description: 'The Google STEP program is designed for 2nd-year students passionate about software development. Duration: 10-12 weeks (Summer). Learn real-world engineering practices and get mentored by Googlers.' },
          { name: 'Uber She++', company: 'Uber', details: 'Internship for women engineers in 2nd year', deadline: 'Mar 2025', description: 'Uber\'s She++ program focuses on supporting women in tech. Work on impactful projects. Duration: 12 weeks (Summer). Great for networking and career growth.' },
          { name: 'Microsoft Codess', company: 'Microsoft', details: 'Coding internship for 2nd year students', deadline: 'Feb 2025', description: 'Microsoft Codess is a coding internship program. Strong focus on practical coding skills. Duration: 10 weeks. Mentorship from experienced engineers.' },
          { name: 'Amazon Propel', company: 'Amazon', details: 'Software development internship', deadline: 'Jan 2025', description: 'Amazon Propel is for students eager to work on large-scale systems. Build scalable solutions. Duration: 12 weeks. Located in AWS offices.' },
          { name: 'Goldman Sachs Campus', company: 'Goldman Sachs', details: 'Finance tech internship', deadline: 'Feb 2025', description: 'Goldman Sachs Campus program for tech enthusiasts. Learn financial systems architecture. Duration: 10 weeks. Excellent stipend and learning opportunities.' },
          { name: 'JPMorgan Code for Good', company: 'JPMorgan', details: 'Tech for social impact internship', deadline: 'Mar 2025', description: 'Work on technology solutions for social causes. JPMorgan Code for Good focuses on impactful projects. Duration: 8 weeks. Make a difference!' }
        ],
        '3rd': [
          { name: 'Microsoft Engage', company: 'Microsoft', details: 'Full-time engineer track for 3rd year', deadline: 'Aug 2025', description: 'Microsoft Engage is a full-time offer track. Fast-paced and competitive. Learn cutting-edge tech. Duration: Year-round internship with potential FTE conversion.' },
          { name: 'Amazon WoW', company: 'Amazon', details: 'Women on Wheels internship', deadline: 'Jul 2025', description: 'Amazon WoW celebrates women engineers. Build scalable systems. Duration: 12 weeks. Based in multiple Amazon offices globally.' },
          { name: 'Flipkart Runway', company: 'Flipkart', details: 'Campus hiring for tech roles', deadline: 'Sep 2025', description: 'Flipkart Runway is their campus hiring program. Work on e-commerce at scale. Duration: Varies. Great for experienced 3rd year students.' },
          { name: 'SAP Next-Gen', company: 'SAP', details: 'Future leader internship program', deadline: 'Aug 2025', description: 'SAP Next-Gen develops future tech leaders. Learn enterprise software development. Duration: 12 weeks. High potential FTE conversion.' },
          { name: 'JP Morgan Quant', company: 'JPMorgan', details: 'Quantitative research internship', deadline: 'Jul 2025', description: 'JP Morgan Quant is for mathematically inclined engineers. Work on algorithmic trading. Duration: 10 weeks. Excellent compensation.' }
        ],
        '4th': [
          { name: 'Google SWE Full-Time', company: 'Google', details: 'Full-time Software Engineer role', deadline: 'Oct 2025', description: 'Google\'s full-time SWE role for graduates. Join a top-tier tech company. Competitive salary and benefits. Work on world-class products at Google.' },
          { name: 'Adobe Research Fellow', company: 'Adobe', details: 'Research fellowship program', deadline: 'Sep 2025', description: 'Adobe Research offers fellowships for creative technologists. Work on research projects. Duration: Year-long commitment. Flexible, research-focused role.' },
          { name: 'Microsoft Aspire', company: 'Microsoft', details: 'Full-time FTE conversion', deadline: 'Oct 2025', description: 'Microsoft Aspire converts top performers to full-time. Join Microsoft as a Software Engineer. Excellent career growth opportunities.' },
          { name: 'Atlassian Early Talent', company: 'Atlassian', details: 'Graduate engineering program', deadline: 'Sep 2025', description: 'Atlassian Early Talent program for fresh graduates. Work on collaboration tools. 2-3 year program with mentorship and structured learning.' },
          { name: 'Goldman Sachs New Analyst', company: 'Goldman Sachs', details: 'Full-time analyst position', deadline: 'Oct 2025', description: 'Goldman Sachs New Analyst Program. Fast-paced career development. Work in technology or finance roles. Excellent training and mentorship.' }
        ]
      };

      // Modal functionality
      const modal = document.getElementById('modal');
      const modalBody = document.getElementById('modal-body');
      const closeBtn = document.querySelector('.close-btn');

      closeBtn.onclick = function() {
        modal.style.display = 'none';
      }

      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      }

      function openModal(type, opportunity) {
        if (type === 'details') {
          modalBody.innerHTML = `
            <h2>${opportunity.name}</h2>
            <p><strong>Company:</strong> ${opportunity.company}</p>
            <p><strong>Deadline:</strong> ${opportunity.deadline}</p>
            <p>${opportunity.description}</p>
            <p><strong>Application Timeline:</strong></p>
            <ul>
              <li>Online Application</li>
              <li>Online Assessment/Coding Round</li>
              <li>Technical Interviews</li>
              <li>HR Round & Offer</li>
            </ul>
          `;
        } else if (type === 'tips') {
          modalBody.innerHTML = `
            <h2>Tips for ${opportunity.name}</h2>
            <p><strong>📋 Resume Tips:</strong></p>
            <ul>
              <li>Highlight relevant projects and achievements</li>
              <li>Quantify your impact with metrics</li>
              <li>Keep it to one page if possible</li>
              <li>Tailor it to the role</li>
            </ul>
            <p><strong>💻 Preparation Strategy:</strong></p>
            <ul>
              <li>Practice DSA on LeetCode (Medium level focus)</li>
              <li>Review core system design concepts</li>
              <li>Prepare 2-3 strong projects to discuss</li>
              <li>Practice behavioral questions (STAR method)</li>
            </ul>
            <p><strong>🎯 Application Tips:</strong></p>
            <ul>
              <li>Apply within first week of opening</li>
              <li>Get a referral if possible (increases chances 3-5x)</li>
              <li>Customize your cover letter</li>
              <li>Follow up after application</li>
            </ul>
          `;
        }
        modal.style.display = 'block';
      }

      // Render opportunities
      function renderOpportunities(year = '2nd') {
        const container = document.getElementById('opportunitiesContainer');
        const ops = opportunities[year];
        
        if (ops.length === 0) {
          container.innerHTML = '<div class="no-results">No opportunities found</div>';
          return;
        }

        container.innerHTML = ops.map(op => `
          <div class="opportunity-card">
            <h4>${op.name}</h4>
            <div class="company">🏢 ${op.company}</div>
            <div class="details">${op.details}</div>
            <div class="deadline">📅 Deadline: ${op.deadline}</div>
            <div class="button-group">
              <button class="btn-details" onclick="openModal('details', ${JSON.stringify(op).replace(/"/g, '&quot;')})">
                View Details
              </button>
              <button class="btn-tips" onclick="openModal('tips', ${JSON.stringify(op).replace(/"/g, '&quot;')})">
                Tips & Guide
              </button>
            </div>
          </div>
        `).join('');
      }

      // Search functionality
      document.getElementById('searchBox').addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const activeYear = document.querySelector('.year-tab.active').getAttribute('data-year');
        const container = document.getElementById('opportunitiesContainer');
        
        let filtered = opportunities[activeYear].filter(op => 
          op.name.toLowerCase().includes(searchTerm) || 
          op.company.toLowerCase().includes(searchTerm)
        );

        if (filtered.length === 0) {
          container.innerHTML = `<div class="no-results">No opportunities found for "${searchTerm}"</div>`;
          return;
        }

        container.innerHTML = filtered.map(op => `
          <div class="opportunity-card">
            <h4>${op.name}</h4>
            <div class="company">🏢 ${op.company}</div>
            <div class="details">${op.details}</div>
            <div class="deadline">📅 Deadline: ${op.deadline}</div>
            <div class="button-group">
              <button class="btn-details" onclick="openModal('details', ${JSON.stringify(op).replace(/"/g, '&quot;')})">
                View Details
              </button>
              <button class="btn-tips" onclick="openModal('tips', ${JSON.stringify(op).replace(/"/g, '&quot;')})">
                Tips & Guide
              </button>
            </div>
          </div>
        `).join('');
      });

      // Year tab switching
      document.querySelectorAll('.year-tab').forEach(tab => {
        tab.addEventListener('click', function() {
          document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          const year = this.getAttribute('data-year');
          document.getElementById('searchBox').value = '';
          renderOpportunities(year);
        });
      });

      // Initial render
      renderOpportunities('2nd');