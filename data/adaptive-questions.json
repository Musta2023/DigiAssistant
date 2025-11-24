{
  "dimensions": [
    {
      "id": "strategie",
      "name": "Strategy",
      "icon": "🎯",
      "description": "Digital transformation vision and alignment",
      "branches": [
        {
          "id": "strat_branch_1",
          "title": "Digital Awareness",
          "questions": [
            {
              "id": "strat_q1",
              "text": "Does your organization have a documented digital transformation strategy?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": {
                "yes": "strat_q2_yes",
                "no": "strat_q2_no"
              },
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "strat_q2_yes",
              "text": "How frequently is your strategy reviewed and updated?",
              "type": "choice",
              "options": [
                { "value": "quarterly", "score": 3, "label": "Quarterly or more often" },
                { "value": "annually", "score": 2, "label": "Annually" },
                { "value": "rarely", "score": 1, "label": "Less than annually" }
              ],
              "impact": "high",
              "nextQuestion": "strat_q3"
            },
            {
              "id": "strat_q2_no",
              "text": "Are you planning to develop a digital strategy in the next 6 months?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "strat_q3",
              "scoring": {
                "yes": 1,
                "no": 0
              }
            },
            {
              "id": "strat_q3",
              "text": "What percentage of your budget is allocated to digital initiatives?",
              "type": "choice",
              "options": [
                { "value": "high", "score": 3, "label": "More than 15%" },
                { "value": "medium", "score": 2, "label": "5-15%" },
                { "value": "low", "score": 1, "label": "Less than 5%" },
                { "value": "none", "score": 0, "label": "No dedicated budget" }
              ],
              "impact": "high",
              "nextQuestion": "strat_q4"
            }
          ]
        },
        {
          "id": "strat_branch_2",
          "title": "Strategic Alignment",
          "questions": [
            {
              "id": "strat_q4",
              "text": "Does your organization align digital initiatives with overall business objectives?",
              "type": "choice",
              "options": [
                { "value": "fully_aligned", "score": 3, "label": "Fully aligned with clear KPIs" },
                { "value": "mostly_aligned", "score": 2, "label": "Mostly aligned" },
                { "value": "partially_aligned", "score": 1, "label": "Partially aligned" },
                { "value": "not_aligned", "score": 0, "label": "No clear alignment" }
              ],
              "impact": "high",
              "nextQuestion": "strat_q5"
            },
            {
              "id": "strat_q5",
              "text": "How do you identify emerging digital opportunities?",
              "type": "choice",
              "options": [
                { "value": "systematic", "score": 3, "label": "Systematic market analysis and innovation labs" },
                { "value": "regular", "score": 2, "label": "Regular competitive analysis" },
                { "value": "ad_hoc", "score": 1, "label": "Ad-hoc observations" },
                { "value": "reactive", "score": 0, "label": "React when competitors move" }
              ],
              "impact": "medium",
              "nextQuestion": "strat_q6"
            },
            {
              "id": "strat_q6",
              "text": "Does your organization have a digital innovation budget?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "strat_q7",
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "strat_q7",
              "text": "How do you measure success of your digital initiatives?",
              "type": "choice",
              "options": [
                {
                  "value": "comprehensive",
                  "score": 3,
                  "label": "Comprehensive metrics (ROI, customer satisfaction, efficiency)"
                },
                { "value": "business", "score": 2, "label": "Business metrics only" },
                { "value": "technical", "score": 1, "label": "Technical metrics" },
                { "value": "none", "score": 0, "label": "No defined metrics" }
              ],
              "impact": "high",
              "nextQuestion": "strat_q8"
            }
          ]
        },
        {
          "id": "strat_branch_3",
          "title": "Leadership & Governance",
          "questions": [
            {
              "id": "strat_q8",
              "text": "What is your organization's risk tolerance for digital innovation?",
              "type": "choice",
              "options": [
                { "value": "high", "score": 3, "label": "High - willing to experiment" },
                { "value": "moderate", "score": 2, "label": "Moderate - calculated risks" },
                { "value": "low", "score": 1, "label": "Low - prefer proven solutions" },
                { "value": "minimal", "score": 0, "label": "Minimal - avoid all risks" }
              ],
              "impact": "medium",
              "nextQuestion": "strat_q9"
            },
            {
              "id": "strat_q9",
              "text": "Is there executive sponsorship for digital transformation?",
              "type": "choice",
              "options": [
                { "value": "ceo_owned", "score": 3, "label": "CEO/Board level ownership" },
                { "value": "cto_owned", "score": 2, "label": "CTO/IT leadership ownership" },
                { "value": "department", "score": 1, "label": "Department level initiatives" },
                { "value": "grassroots", "score": 0, "label": "Grassroots efforts only" }
              ],
              "impact": "high",
              "nextQuestion": "strat_q10"
            },
            {
              "id": "strat_q10",
              "text": "How frequently do leadership reviews digital transformation progress?",
              "type": "choice",
              "options": [
                { "value": "monthly", "score": 3, "label": "Monthly or more" },
                { "value": "quarterly", "score": 2, "label": "Quarterly" },
                { "value": "annually", "score": 1, "label": "Annually" },
                { "value": "rarely", "score": 0, "label": "Rarely" }
              ],
              "impact": "medium",
              "nextQuestion": "strat_q11"
            },
            {
              "id": "strat_q11",
              "text": "Is there a dedicated digital transformation office or team?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": "strat_q12",
              "scoring": {
                "yes": 2,
                "no": 0
              }
            }
          ]
        },
        {
          "id": "strat_branch_4",
          "title": "Maturity & Optimization",
          "questions": [
            {
              "id": "strat_q12",
              "text": "What is your overall digital maturity level assessment?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced - digital leader in industry" },
                { "value": "intermediate", "score": 2, "label": "Intermediate - solid foundation" },
                { "value": "developing", "score": 1, "label": "Developing - early stage" },
                { "value": "initial", "score": 0, "label": "Initial - just beginning" }
              ],
              "impact": "high",
              "nextQuestion": null
            }
          ]
        }
      ]
    },
    {
      "id": "culture",
      "name": "Culture & People",
      "icon": "👥",
      "description": "Digital culture, skills, and organizational readiness",
      "branches": [
        {
          "id": "cult_branch_1",
          "title": "Digital Literacy",
          "questions": [
            {
              "id": "cult_q1",
              "text": "Does your organization have a formal digital skills development program?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": {
                "yes": "cult_q2_yes",
                "no": "cult_q2_no"
              },
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "cult_q2_yes",
              "text": "How many employees participate in digital training annually?",
              "type": "choice",
              "options": [
                { "value": "most", "score": 3, "label": "More than 75% of workforce" },
                { "value": "half", "score": 2, "label": "50-75% of workforce" },
                { "value": "some", "score": 1, "label": "25-50% of workforce" },
                { "value": "few", "score": 0, "label": "Less than 25%" }
              ],
              "impact": "high",
              "nextQuestion": "cult_q3"
            },
            {
              "id": "cult_q2_no",
              "text": "Are you planning to establish digital training in the next 12 months?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "cult_q3",
              "scoring": {
                "yes": 1,
                "no": 0
              }
            },
            {
              "id": "cult_q3",
              "text": "What is the primary barrier to digital skill adoption?",
              "type": "choice",
              "options": [
                { "value": "no_barrier", "score": 3, "label": "No significant barrier" },
                { "value": "resource", "score": 2, "label": "Lack of training resources" },
                { "value": "resistance", "score": 1, "label": "Employee resistance" },
                { "value": "leadership", "score": 0, "label": "Lack of leadership support" }
              ],
              "impact": "medium",
              "nextQuestion": "cult_q4"
            }
          ]
        },
        {
          "id": "cult_branch_2",
          "title": "Cultural Mindset",
          "questions": [
            {
              "id": "cult_q4",
              "text": "Does your organization encourage experimentation and innovation?",
              "type": "choice",
              "options": [
                { "value": "encouraged", "score": 3, "label": "Actively encouraged with support" },
                { "value": "tolerated", "score": 2, "label": "Tolerated but not encouraged" },
                { "value": "discouraged", "score": 1, "label": "Discouraged due to risk aversion" },
                { "value": "blocked", "score": 0, "label": "Blocked or prevented" }
              ],
              "impact": "high",
              "nextQuestion": "cult_q5"
            },
            {
              "id": "cult_q5",
              "text": "How is failure treated in your organization?",
              "type": "choice",
              "options": [
                { "value": "learning", "score": 3, "label": "Learning opportunity" },
                { "value": "accepted", "score": 2, "label": "Accepted as part of innovation" },
                { "value": "penalized", "score": 1, "label": "Penalized mildly" },
                { "value": "severe", "score": 0, "label": "Severely punished" }
              ],
              "impact": "high",
              "nextQuestion": "cult_q6"
            },
            {
              "id": "cult_q6",
              "text": "Is there cross-functional collaboration between departments?",
              "type": "choice",
              "options": [
                { "value": "extensive", "score": 3, "label": "Extensive and formalized" },
                { "value": "regular", "score": 2, "label": "Regular and informal" },
                { "value": "limited", "score": 1, "label": "Limited to specific projects" },
                { "value": "minimal", "score": 0, "label": "Minimal to none" }
              ],
              "impact": "medium",
              "nextQuestion": "cult_q7"
            },
            {
              "id": "cult_q7",
              "text": "How do you identify and develop digital champions?",
              "type": "choice",
              "options": [
                { "value": "systematic", "score": 3, "label": "Systematic identification and development" },
                { "value": "organic", "score": 2, "label": "Organic emergence with support" },
                { "value": "ad_hoc", "score": 1, "label": "Ad-hoc identification" },
                { "value": "none", "score": 0, "label": "No formal process" }
              ],
              "impact": "medium",
              "nextQuestion": "cult_q8"
            }
          ]
        },
        {
          "id": "cult_branch_3",
          "title": "Talent & Recruitment",
          "questions": [
            {
              "id": "cult_q8",
              "text": "Do you hire for digital skills and digital mindset?",
              "type": "choice",
              "options": [
                { "value": "both", "score": 3, "label": "Both skills and mindset" },
                { "value": "skills", "score": 2, "label": "Primarily skills" },
                { "value": "limited", "score": 1, "label": "Limited focus" },
                { "value": "traditional", "score": 0, "label": "Traditional hiring approach" }
              ],
              "impact": "high",
              "nextQuestion": "cult_q9"
            },
            {
              "id": "cult_q9",
              "text": "How challenging is it to retain digital talent?",
              "type": "choice",
              "options": [
                { "value": "easy", "score": 3, "label": "Easy - strong retention" },
                { "value": "moderate", "score": 2, "label": "Moderate - acceptable turnover" },
                { "value": "difficult", "score": 1, "label": "Difficult - frequent departures" },
                { "value": "very_difficult", "score": 0, "label": "Very difficult - high turnover" }
              ],
              "impact": "high",
              "nextQuestion": "cult_q10"
            },
            {
              "id": "cult_q10",
              "text": "Is remote or flexible work available to digital teams?",
              "type": "choice",
              "options": [
                { "value": "flexible", "score": 3, "label": "Highly flexible (remote/hybrid)" },
                { "value": "some", "score": 2, "label": "Some flexibility allowed" },
                { "value": "limited", "score": 1, "label": "Limited flexibility" },
                { "value": "none", "score": 0, "label": "Not available" }
              ],
              "impact": "medium",
              "nextQuestion": "cult_q11"
            },
            {
              "id": "cult_q11",
              "text": "What is your employee satisfaction with digital tools and processes?",
              "type": "choice",
              "options": [
                { "value": "high", "score": 3, "label": "High satisfaction" },
                { "value": "good", "score": 2, "label": "Good satisfaction" },
                { "value": "average", "score": 1, "label": "Average satisfaction" },
                { "value": "low", "score": 0, "label": "Low satisfaction" }
              ],
              "impact": "medium",
              "nextQuestion": "cult_q12"
            }
          ]
        },
        {
          "id": "cult_branch_4",
          "title": "Organizational Readiness",
          "questions": [
            {
              "id": "cult_q12",
              "text": "How well equipped is your workforce for future digital changes?",
              "type": "choice",
              "options": [
                { "value": "well_equipped", "score": 3, "label": "Well equipped and adaptable" },
                { "value": "adequately", "score": 2, "label": "Adequately prepared" },
                { "value": "somewhat", "score": 1, "label": "Somewhat prepared" },
                { "value": "unprepared", "score": 0, "label": "Unprepared" }
              ],
              "impact": "high",
              "nextQuestion": null
            }
          ]
        }
      ]
    },
    {
      "id": "relation_client",
      "name": "Customer Relations",
      "icon": "🤝",
      "description": "Customer engagement, experience, and digital channels",
      "branches": [
        {
          "id": "rc_branch_1",
          "title": "Digital Presence",
          "questions": [
            {
              "id": "rc_q1",
              "text": "Does your organization have a strong digital presence?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": {
                "yes": "rc_q2_yes",
                "no": "rc_q2_no"
              },
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "rc_q2_yes",
              "text": "How many digital channels do you actively manage?",
              "type": "choice",
              "options": [
                { "value": "many", "score": 3, "label": "5 or more (web, mobile, social, etc.)" },
                { "value": "several", "score": 2, "label": "3-4 channels" },
                { "value": "two", "score": 1, "label": "2 channels" },
                { "value": "one", "score": 0, "label": "Only 1 channel" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q3"
            },
            {
              "id": "rc_q2_no",
              "text": "Are you planning to establish digital channels soon?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "rc_q3",
              "scoring": {
                "yes": 1,
                "no": 0
              }
            },
            {
              "id": "rc_q3",
              "text": "What is your website's mobile user percentage?",
              "type": "choice",
              "options": [
                { "value": "majority", "score": 3, "label": "More than 60%" },
                { "value": "significant", "score": 2, "label": "40-60%" },
                { "value": "minority", "score": 1, "label": "20-40%" },
                { "value": "minimal", "score": 0, "label": "Less than 20%" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q4"
            }
          ]
        },
        {
          "id": "rc_branch_2",
          "title": "Customer Experience",
          "questions": [
            {
              "id": "rc_q4",
              "text": "Do you have a structured customer experience management program?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": {
                "yes": "rc_q5_yes",
                "no": "rc_q5_no"
              },
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "rc_q5_yes",
              "text": "How frequently do you measure customer satisfaction?",
              "type": "choice",
              "options": [
                { "value": "continuous", "score": 3, "label": "Continuously/Real-time" },
                { "value": "monthly", "score": 2, "label": "Monthly or quarterly" },
                { "value": "annually", "score": 1, "label": "Annually" },
                { "value": "rarely", "score": 0, "label": "Rarely" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q6"
            },
            {
              "id": "rc_q5_no",
              "text": "Do you collect customer feedback through any channel?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "rc_q6",
              "scoring": {
                "yes": 1,
                "no": 0
              }
            },
            {
              "id": "rc_q6",
              "text": "What is your average customer response time to digital inquiries?",
              "type": "choice",
              "options": [
                { "value": "under_hour", "score": 3, "label": "Under 1 hour" },
                { "value": "same_day", "score": 2, "label": "Same day" },
                { "value": "few_days", "score": 1, "label": "2-3 days" },
                { "value": "week", "score": 0, "label": "More than a week" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q7"
            }
          ]
        },
        {
          "id": "rc_branch_3",
          "title": "Personalization & Data",
          "questions": [
            {
              "id": "rc_q7",
              "text": "Do you use customer data for personalization?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced personalization (AI-driven)" },
                { "value": "basic", "score": 2, "label": "Basic personalization" },
                { "value": "minimal", "score": 1, "label": "Minimal personalization" },
                { "value": "none", "score": 0, "label": "No personalization" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q8"
            },
            {
              "id": "rc_q8",
              "text": "How is customer data collected and managed?",
              "type": "choice",
              "options": [
                { "value": "gdpr_compliant", "score": 3, "label": "GDPR-compliant and well-governed" },
                { "value": "compliant", "score": 2, "label": "Compliant with regulations" },
                { "value": "basic", "score": 1, "label": "Basic compliance" },
                { "value": "ad_hoc", "score": 0, "label": "Ad-hoc and unmanaged" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q9"
            },
            {
              "id": "rc_q9",
              "text": "Do you offer omnichannel customer experience?",
              "type": "choice",
              "options": [
                { "value": "seamless", "score": 3, "label": "Seamless across all channels" },
                { "value": "integrated", "score": 2, "label": "Integrated across most channels" },
                { "value": "partial", "score": 1, "label": "Partially integrated" },
                { "value": "siloed", "score": 0, "label": "Siloed channels" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q10"
            },
            {
              "id": "rc_q10",
              "text": "What percentage of sales come from digital channels?",
              "type": "choice",
              "options": [
                { "value": "majority", "score": 3, "label": "More than 50%" },
                { "value": "significant", "score": 2, "label": "25-50%" },
                { "value": "growing", "score": 1, "label": "10-25%" },
                { "value": "minimal", "score": 0, "label": "Less than 10%" }
              ],
              "impact": "high",
              "nextQuestion": "rc_q11"
            }
          ]
        },
        {
          "id": "rc_branch_4",
          "title": "Digital Engagement",
          "questions": [
            {
              "id": "rc_q11",
              "text": "Do you use marketing automation or CRM systems?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced automation platforms" },
                { "value": "basic", "score": 2, "label": "Basic CRM/automation" },
                { "value": "spreadsheet", "score": 1, "label": "Manual tracking/spreadsheets" },
                { "value": "none", "score": 0, "label": "None in place" }
              ],
              "impact": "medium",
              "nextQuestion": "rc_q12"
            },
            {
              "id": "rc_q12",
              "text": "What is your customer retention rate trend?",
              "type": "choice",
              "options": [
                { "value": "improving", "score": 3, "label": "Improving significantly" },
                { "value": "stable", "score": 2, "label": "Stable and healthy" },
                { "value": "declining", "score": 1, "label": "Slowly declining" },
                { "value": "poor", "score": 0, "label": "Significantly declining" }
              ],
              "impact": "high",
              "nextQuestion": null
            }
          ]
        }
      ]
    },
    {
      "id": "processus",
      "name": "Processes",
      "icon": "⚙️",
      "description": "Business process automation and optimization",
      "branches": [
        {
          "id": "proc_branch_1",
          "title": "Process Documentation",
          "questions": [
            {
              "id": "proc_q1",
              "text": "Are your critical business processes documented?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": {
                "yes": "proc_q2_yes",
                "no": "proc_q2_no"
              },
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "proc_q2_yes",
              "text": "How current is your process documentation?",
              "type": "choice",
              "options": [
                { "value": "current", "score": 3, "label": "Updated within last year" },
                { "value": "mostly", "score": 2, "label": "Mostly current (1-2 years old)" },
                { "value": "outdated", "score": 1, "label": "Somewhat outdated" },
                { "value": "very_old", "score": 0, "label": "Very outdated" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q3"
            },
            {
              "id": "proc_q2_no",
              "text": "Are you planning to document processes?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "proc_q3",
              "scoring": {
                "yes": 1,
                "no": 0
              }
            },
            {
              "id": "proc_q3",
              "text": "What percentage of processes are standardized?",
              "type": "choice",
              "options": [
                { "value": "mostly", "score": 3, "label": "More than 80%" },
                { "value": "significant", "score": 2, "label": "60-80%" },
                { "value": "partial", "score": 1, "label": "40-60%" },
                { "value": "minimal", "score": 0, "label": "Less than 40%" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q4"
            }
          ]
        },
        {
          "id": "proc_branch_2",
          "title": "Automation",
          "questions": [
            {
              "id": "proc_q4",
              "text": "What percentage of routine tasks are automated?",
              "type": "choice",
              "options": [
                { "value": "high", "score": 3, "label": "More than 70%" },
                { "value": "moderate", "score": 2, "label": "40-70%" },
                { "value": "limited", "score": 1, "label": "10-40%" },
                { "value": "minimal", "score": 0, "label": "Less than 10%" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q5"
            },
            {
              "id": "proc_q5",
              "text": "Do you use workflow automation tools?",
              "type": "choice",
              "options": [
                { "value": "multiple", "score": 3, "label": "Multiple integrated platforms" },
                { "value": "some", "score": 2, "label": "Few automation tools" },
                { "value": "basic", "score": 1, "label": "Basic automation only" },
                { "value": "none", "score": 0, "label": "No automation tools" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q6"
            },
            {
              "id": "proc_q6",
              "text": "How quickly can you implement process improvements?",
              "type": "choice",
              "options": [
                { "value": "agile", "score": 3, "label": "Within weeks (agile approach)" },
                { "value": "fast", "score": 2, "label": "Within months" },
                { "value": "slow", "score": 1, "label": "6-12 months" },
                { "value": "very_slow", "score": 0, "label": "More than a year" }
              ],
              "impact": "medium",
              "nextQuestion": "proc_q7"
            },
            {
              "id": "proc_q7",
              "text": "Are processes continuously monitored and optimized?",
              "type": "choice",
              "options": [
                { "value": "continuous", "score": 3, "label": "Continuous monitoring and optimization" },
                { "value": "regular", "score": 2, "label": "Regular reviews (quarterly)" },
                { "value": "periodic", "score": 1, "label": "Periodic reviews (annually)" },
                { "value": "rare", "score": 0, "label": "Rarely reviewed" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q8"
            }
          ]
        },
        {
          "id": "proc_branch_3",
          "title": "Integration & Data Flow",
          "questions": [
            {
              "id": "proc_q8",
              "text": "How well integrated are your core business systems?",
              "type": "choice",
              "options": [
                { "value": "fully", "score": 3, "label": "Fully integrated end-to-end" },
                { "value": "mostly", "score": 2, "label": "Mostly integrated" },
                { "value": "partial", "score": 1, "label": "Partially integrated" },
                { "value": "siloed", "score": 0, "label": "Siloed/disconnected" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q9"
            },
            {
              "id": "proc_q9",
              "text": "Do you have real-time data visibility across processes?",
              "type": "choice",
              "options": [
                { "value": "real_time", "score": 3, "label": "Real-time dashboards and insights" },
                { "value": "near_real", "score": 2, "label": "Near real-time (hourly)" },
                { "value": "daily", "score": 1, "label": "Daily reporting" },
                { "value": "manual", "score": 0, "label": "Manual reporting" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q10"
            },
            {
              "id": "proc_q10",
              "text": "What is the average process cycle time trend?",
              "type": "choice",
              "options": [
                { "value": "decreasing", "score": 3, "label": "Significantly decreasing" },
                { "value": "stable", "score": 2, "label": "Stable and optimized" },
                { "value": "increasing", "score": 1, "label": "Slowly increasing" },
                { "value": "inefficient", "score": 0, "label": "Significantly increasing" }
              ],
              "impact": "high",
              "nextQuestion": "proc_q11"
            },
            {
              "id": "proc_q11",
              "text": "How do you handle exceptions in automated processes?",
              "type": "choice",
              "options": [
                { "value": "ai_handled", "score": 3, "label": "AI-driven exception handling" },
                { "value": "escalation", "score": 2, "label": "Smart escalation rules" },
                { "value": "manual", "score": 1, "label": "Manual review" },
                { "value": "blocked", "score": 0, "label": "Process blocks" }
              ],
              "impact": "medium",
              "nextQuestion": "proc_q12"
            }
          ]
        },
        {
          "id": "proc_branch_4",
          "title": "Performance & Compliance",
          "questions": [
            {
              "id": "proc_q12",
              "text": "What is your process compliance and audit readiness?",
              "type": "choice",
              "options": [
                { "value": "excellent", "score": 3, "label": "Excellent - audit ready" },
                { "value": "good", "score": 2, "label": "Good - minor gaps" },
                { "value": "fair", "score": 1, "label": "Fair - some gaps" },
                { "value": "poor", "score": 0, "label": "Poor - significant gaps" }
              ],
              "impact": "high",
              "nextQuestion": null
            }
          ]
        }
      ]
    },
    {
      "id": "technologies",
      "name": "Technologies",
      "icon": "💻",
      "description": "Infrastructure, platforms, and technology modernization",
      "branches": [
        {
          "id": "tech_branch_1",
          "title": "Infrastructure & Cloud",
          "questions": [
            {
              "id": "tech_q1",
              "text": "What percentage of your infrastructure is cloud-based?",
              "type": "choice",
              "options": [
                { "value": "majority", "score": 3, "label": "More than 80%" },
                { "value": "significant", "score": 2, "label": "50-80%" },
                { "value": "partial", "score": 1, "label": "20-50%" },
                { "value": "minimal", "score": 0, "label": "Less than 20%" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q2"
            },
            {
              "id": "tech_q2",
              "text": "Do you use multiple cloud providers for flexibility?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "tech_q3",
              "scoring": {
                "yes": 2,
                "no": 1
              }
            },
            {
              "id": "tech_q3",
              "text": "How is your IT infrastructure resilience and redundancy?",
              "type": "choice",
              "options": [
                { "value": "excellent", "score": 3, "label": "High availability across regions" },
                { "value": "good", "score": 2, "label": "Good redundancy in place" },
                { "value": "basic", "score": 1, "label": "Basic backup systems" },
                { "value": "minimal", "score": 0, "label": "Minimal redundancy" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q4"
            },
            {
              "id": "tech_q4",
              "text": "Is your infrastructure scalable for growth?",
              "type": "choice",
              "options": [
                { "value": "auto_scaling", "score": 3, "label": "Auto-scaling capabilities" },
                { "value": "scalable", "score": 2, "label": "Easily scalable" },
                { "value": "limited", "score": 1, "label": "Limited scalability" },
                { "value": "fixed", "score": 0, "label": "Fixed capacity" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q5"
            }
          ]
        },
        {
          "id": "tech_branch_2",
          "title": "Application Architecture",
          "questions": [
            {
              "id": "tech_q5",
              "text": "What is your application architecture approach?",
              "type": "choice",
              "options": [
                { "value": "microservices", "score": 3, "label": "Microservices/containerized" },
                { "value": "modular", "score": 2, "label": "Modular monolith" },
                { "value": "legacy", "score": 1, "label": "Legacy monolithic" },
                { "value": "mixed", "score": 0, "label": "Mixed/undefined" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q6"
            },
            {
              "id": "tech_q6",
              "text": "How frequently do you deploy updates?",
              "type": "choice",
              "options": [
                { "value": "continuous", "score": 3, "label": "Multiple times per day (CI/CD)" },
                { "value": "weekly", "score": 2, "label": "Weekly" },
                { "value": "monthly", "score": 1, "label": "Monthly" },
                { "value": "quarterly", "score": 0, "label": "Quarterly or less" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q7"
            },
            {
              "id": "tech_q7",
              "text": "Do you use APIs for system integration?",
              "type": "choice",
              "options": [
                { "value": "extensively", "score": 3, "label": "API-first architecture" },
                { "value": "regularly", "score": 2, "label": "Regular API usage" },
                { "value": "limited", "score": 1, "label": "Limited API usage" },
                { "value": "none", "score": 0, "label": "No APIs" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q8"
            },
            {
              "id": "tech_q8",
              "text": "What is your technical debt situation?",
              "type": "choice",
              "options": [
                { "value": "minimal", "score": 3, "label": "Minimal - actively managed" },
                { "value": "moderate", "score": 2, "label": "Moderate - being addressed" },
                { "value": "significant", "score": 1, "label": "Significant - growing" },
                { "value": "critical", "score": 0, "label": "Critical - blocking progress" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q9"
            }
          ]
        },
        {
          "id": "tech_branch_3",
          "title": "Data & Analytics",
          "questions": [
            {
              "id": "tech_q9",
              "text": "Do you have a modern data platform?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced data lake/warehouse" },
                { "value": "basic", "score": 2, "label": "Basic data warehouse" },
                { "value": "legacy", "score": 1, "label": "Legacy data systems" },
                { "value": "none", "score": 0, "label": "No centralized platform" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q10"
            },
            {
              "id": "tech_q10",
              "text": "Do you use AI/ML in your applications?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced AI/ML implementations" },
                { "value": "basic", "score": 2, "label": "Some ML models in use" },
                { "value": "exploring", "score": 1, "label": "Exploring AI/ML" },
                { "value": "none", "score": 0, "label": "Not using AI/ML" }
              ],
              "impact": "medium",
              "nextQuestion": "tech_q11"
            },
            {
              "id": "tech_q11",
              "text": "What analytics tools do you use for business insights?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced BI platforms (Tableau, Power BI)" },
                { "value": "basic", "score": 2, "label": "Basic BI tools" },
                { "value": "custom", "score": 1, "label": "Custom dashboards/scripts" },
                { "value": "manual", "score": 0, "label": "Manual reporting" }
              ],
              "impact": "high",
              "nextQuestion": "tech_q12"
            },
            {
              "id": "tech_q12",
              "text": "How is your data governance and quality?",
              "type": "choice",
              "options": [
                { "value": "excellent", "score": 3, "label": "Excellent - strong governance" },
                { "value": "good", "score": 2, "label": "Good - documented policies" },
                { "value": "fair", "score": 1, "label": "Fair - some governance" },
                { "value": "poor", "score": 0, "label": "Poor - ad-hoc approach" }
              ],
              "impact": "high",
              "nextQuestion": null
            }
          ]
        }
      ]
    },
    {
      "id": "securite",
      "name": "Security",
      "icon": "🔒",
      "description": "Information security, compliance, and risk management",
      "branches": [
        {
          "id": "sec_branch_1",
          "title": "Security Fundamentals",
          "questions": [
            {
              "id": "sec_q1",
              "text": "Do you have a comprehensive information security policy?",
              "type": "binary",
              "impact": "high",
              "nextQuestion": {
                "yes": "sec_q2_yes",
                "no": "sec_q2_no"
              },
              "scoring": {
                "yes": 2,
                "no": 0
              }
            },
            {
              "id": "sec_q2_yes",
              "text": "How frequently is your security policy updated?",
              "type": "choice",
              "options": [
                { "value": "annually", "score": 3, "label": "Annually or more often" },
                { "value": "biennial", "score": 2, "label": "Every 2 years" },
                { "value": "periodic", "score": 1, "label": "Periodically" },
                { "value": "rarely", "score": 0, "label": "Rarely" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q3"
            },
            {
              "id": "sec_q2_no",
              "text": "Are you developing a security policy?",
              "type": "binary",
              "impact": "medium",
              "nextQuestion": "sec_q3",
              "scoring": {
                "yes": 1,
                "no": 0
              }
            },
            {
              "id": "sec_q3",
              "text": "Do you require multi-factor authentication (MFA)?",
              "type": "choice",
              "options": [
                { "value": "all", "score": 3, "label": "For all users" },
                { "value": "critical", "score": 2, "label": "For critical systems only" },
                { "value": "optional", "score": 1, "label": "Optional" },
                { "value": "none", "score": 0, "label": "Not implemented" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q4"
            }
          ]
        },
        {
          "id": "sec_branch_2",
          "title": "Threat Protection",
          "questions": [
            {
              "id": "sec_q4",
              "text": "How do you monitor for security threats?",
              "type": "choice",
              "options": [
                { "value": "siem", "score": 3, "label": "SIEM with 24/7 monitoring" },
                { "value": "automated", "score": 2, "label": "Automated monitoring" },
                { "value": "manual", "score": 1, "label": "Manual periodic checks" },
                { "value": "reactive", "score": 0, "label": "Only reactive after incidents" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q5"
            },
            {
              "id": "sec_q5",
              "text": "Do you conduct regular security testing?",
              "type": "choice",
              "options": [
                { "value": "continuous", "score": 3, "label": "Continuous penetration testing" },
                { "value": "annual", "score": 2, "label": "Annual security assessments" },
                { "value": "periodic", "score": 1, "label": "Periodic testing" },
                { "value": "none", "score": 0, "label": "No security testing" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q6"
            },
            {
              "id": "sec_q6",
              "text": "Is your data encrypted at rest and in transit?",
              "type": "choice",
              "options": [
                { "value": "all", "score": 3, "label": "All sensitive data encrypted" },
                { "value": "most", "score": 2, "label": "Most data encrypted" },
                { "value": "partial", "score": 1, "label": "Partial encryption" },
                { "value": "none", "score": 0, "label": "No encryption" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q7"
            },
            {
              "id": "sec_q7",
              "text": "Do you have incident response procedures?",
              "type": "choice",
              "options": [
                { "value": "advanced", "score": 3, "label": "Advanced with dedicated team" },
                { "value": "documented", "score": 2, "label": "Documented procedures" },
                { "value": "basic", "score": 1, "label": "Basic plan" },
                { "value": "none", "score": 0, "label": "No procedures" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q8"
            }
          ]
        },
        {
          "id": "sec_branch_3",
          "title": "Compliance & Privacy",
          "questions": [
            {
              "id": "sec_q8",
              "text": "Which compliance standards do you meet?",
              "type": "choice",
              "options": [
                { "value": "multiple", "score": 3, "label": "Multiple (ISO27001, SOC2, GDPR, etc.)" },
                { "value": "some", "score": 2, "label": "Some relevant standards" },
                { "value": "basic", "score": 1, "label": "Basic requirements only" },
                { "value": "none", "score": 0, "label": "No formal compliance" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q9"
            },
            {
              "id": "sec_q9",
              "text": "How do you manage third-party security risks?",
              "type": "choice",
              "options": [
                { "value": "comprehensive", "score": 3, "label": "Comprehensive vendor assessments" },
                { "value": "regular", "score": 2, "label": "Regular security reviews" },
                { "value": "basic", "score": 1, "label": "Basic vendor agreements" },
                { "value": "minimal", "score": 0, "label": "Minimal oversight" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q10"
            },
            {
              "id": "sec_q10",
              "text": "Do you have GDPR/privacy impact assessment processes?",
              "type": "choice",
              "options": [
                { "value": "formal", "score": 3, "label": "Formal assessment procedures" },
                { "value": "informal", "score": 2, "label": "Informal processes in place" },
                { "value": "basic", "score": 1, "label": "Basic consideration" },
                { "value": "none", "score": 0, "label": "No formal process" }
              ],
              "impact": "high",
              "nextQuestion": "sec_q11"
            },
            {
              "id": "sec_q11",
              "text": "How do you handle security training for employees?",
              "type": "choice",
              "options": [
                { "value": "mandatory", "score": 3, "label": "Mandatory annual training" },
                { "value": "regular", "score": 2, "label": "Regular awareness programs" },
                { "value": "occasional", "score": 1, "label": "Occasional training" },
                { "value": "none", "score": 0, "label": "No formal training" }
              ],
              "impact": "medium",
              "nextQuestion": "sec_q12"
            }
          ]
        },
        {
          "id": "sec_branch_4",
          "title": "Investment & Maturity",
          "questions": [
            {
              "id": "sec_q12",
              "text": "What is your security investment as percentage of IT budget?",
              "type": "choice",
              "options": [
                { "value": "high", "score": 3, "label": "More than 15% (above industry average)" },
                { "value": "industry", "score": 2, "label": "10-15% (industry average)" },
                { "value": "low", "score": 1, "label": "5-10%" },
                { "value": "minimal", "score": 0, "label": "Less than 5%" }
              ],
              "impact": "high",
              "nextQuestion": null
            }
          ]
        }
      ]
    }
  ],
  "recommendations": {
    "strategie": {
      "low": "Develop a formal digital strategy aligned with business goals. Start by assessing market opportunities and defining digital priorities.",
      "medium": "Enhance strategic alignment by regularly reviewing your digital roadmap and ensuring adequate budget allocation.",
      "high": "Consolidate your digital strategy by integrating it with innovation initiatives and establishing metrics-driven decision making."
    },
    "culture": {
      "low": "Invest in digital literacy programs and create a culture of experimentation. Start with awareness campaigns.",
      "medium": "Expand training programs and establish digital champions across departments to drive adoption.",
      "high": "Foster continuous learning and embed digital thinking into hiring and promotion criteria."
    },
    "relation_client": {
      "low": "Establish digital customer touchpoints. Start with a website and social media presence.",
      "medium": "Integrate digital channels and implement customer feedback mechanisms. Consider omnichannel strategies.",
      "high": "Implement advanced personalization and predictive analytics for enhanced customer experiences."
    },
    "processus": {
      "low": "Document critical business processes and identify automation opportunities. Start with high-impact, repeatable tasks.",
      "medium": "Implement workflow automation tools and establish metrics for process efficiency.",
      "high": "Achieve full end-to-end automation with real-time monitoring and continuous optimization."
    },
    "technologies": {
      "low": "Establish basic infrastructure with reliable connectivity. Assess technology needs against business objectives.",
      "medium": "Migrate to cloud platforms and integrate business-critical applications.",
      "high": "Build an interconnected tech ecosystem with advanced integrations and scalable infrastructure."
    },
    "securite": {
      "low": "Implement fundamental security practices: passwords, updates, and basic backups. Establish a security policy.",
      "medium": "Conduct regular security audits and implement role-based access controls.",
      "high": "Achieve compliance with industry standards and implement proactive threat detection."
    }
  }
}
