class App extends React.Component {
    state = {
        flashcards:[]
    }

    componentDidMount = () => {
        axios.get('/flashcards').then(
            (response) => {
                this.setState({
                    flashcards:response.data
                })
            }
        )
    }

    createFlashcard = (event) => {
        event.preventDefault();
        axios.post(
            '/flashcards',
            {
                question:this.state.newFlashcardQuestion,
                tips:this.state.newFlashcardTips,
                answer:this.state.newFlashcardAnswer,
                examples:this.state.newFlashcardExamples

            }
        ).then(
            (response) => {
                this.setState({
                    flashcards:response.data,
                    question: '',
                    tips: '',
                    answer: '',
                    examples: ''
                })
            }
        )
        event.target.reset()
        window.location.reload(true);
    }

    changeNewFlashcardTips = (event) => {
        this.setState({
            newFlashcardTips:event.target.value
        });
    }

    changeNewFlashcardQuestion = (event) => {
        this.setState({
            newFlashcardQuestion:event.target.value
        });
    }

    changeNewFlashcardAnswer = (event) => {
        this.setState({
            newFlashcardAnswer:event.target.value
        });
    }

    changeNewFlashcardExamples = (event) => {
        this.setState({
            newFlashcardExamples:event.target.value
        });
    }

    deleteFlashcard = (event) => {
        axios.delete('/flashcards/' + event.target.value).then(
            (response) => {
                this.setState({
                    flashcards:response.data
                })
            }
        )

    }

    updateFlashcard = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/flashcards/' + id,
            {
                question:this.state.updateFlashcardQuestion,
                tips:this.state.updateFlashcardTips,
                answer:this.state.updateFlashcardAnswer,
                examples:this.state.updateFlashcardExamples

            }
        ).then(
            (response) => {
                this.setState({
                    flashcards:response.data,
                    question:'',
                    tips:'',
                    answer: '',
                    examples: ''
                })
            }
        )
        event.target.reset()
        window.location.reload(true)
    }

    changeUpdateFlashcardQuestion = (event) => {
        this.setState(
            {
                updateFlashcardQuestion:event.target.value
            }
        )
    }

    changeUpdateFlashcardTips = (event) => {
        this.setState(
            {
                updateFlashcardTips:event.target.value
            }
        )
    }

    changeUpdateFlashcardAnswer = (event) => {
        this.setState(
            {
                updateFlashcardAnswer:event.target.value
            }
        )
    }

    changeUpdateFlashcardExamples = (event) => {
        this.setState(
            {
                updateFlashcardExamples:event.target.value
            }
        )
    }

    // randomFlashcard = (card) => {
    //   for (let i=0; i< 50; i++) {
    //     const j = Math.floor(Math.random() * (i + 1))
    //     const temp = card[i]
    //     card[i] = card[j]
    //     card[j] = temp
    //   }
    //   return card
    // }
    //
    // getRandom = () => {
    //     axios.get('/flashcards/').then(
    //         (response) => {
    //             this.setState({
    //                 flashcards:response.data
    //             })
    //         }
    //     )
    // }

    render = () => {
        return <div className='main'><br />
            <div className='itemBox'>
                {
                    this.state.flashcards.map(
                        (card, index) => {
                            return <div className='item' key={index}>

                            <details>
                                <summary>{card.question}</summary><br />
                                Pro Tips: <i>{card.tips}</i><br />
                                My Answers: <b>{card.answer}</b><br />
                                Examples: <b>{card.examples}</b>

                                <details>
                                <summary>Edit Details</summary><br />

                                <form id={card.id} onSubmit={this.updateFlashcard}>
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardQuestion} type="text" defaultValue={card.question} /><br/>
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardTips} type="text" defaultValue={card.tips} /><br/>
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardAnswer} type='text' defaultValue={card.answer} /><br />
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardExamples} type='text' defaultValue={card.examples} /><br />
                                    <input id='update' type="submit" value="Update Flashcard"/>
                                </form>
                                <button id='delete' value={card.id} onClick={this.deleteFlashcard}>DELETE</button>
                                </details>
                              </details>
                            </div>
                        }
                    )
                }
            </div>
            <br /><br />
            <form onSubmit={this.createFlashcard}>
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardQuestion} type="text" placeholder="interview question" /><br/>
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardTips} type="text" placeholder="pro tips" /><br/>
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardAnswer}
                type='text' placeholder='your answers' /><br />
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardExamples}
                type='text' placeholder='specific examples' /><br />
                <input id='create' type="submit" value="Create A New Flashcard" />
            </form><br /><br />
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)


// 1. Tell Me About Yourself.
// This question seems simple, so many people fail to prepare for it, but it’s crucial. Here's the deal: Don’t give your complete employment (or personal) history. Instead, give a pitch—one that’s concise and compelling and that shows exactly why you’re the right fit for the job. Muse writer and MIT career counselor Lily Zhang recommends using a present, past, future formula. Talk a little bit about your current role (including the scope and perhaps one big accomplishment), then give some background as to how you got there and experience you have that’s relevant. Finally, segue into why you want—and would be perfect for—this role.
//
// I love solving problems and helping people. I have a background in restaurant management so I am a team leader and I thrive in a fast paced environment. I am the right person for this job because of my strong work ethic and I'm fun to work with!
// Read More: A Complete Guide to Answering “Tell Me About Yourself” in an Interview (Plus Examples!)
//
// 2. How Did You Hear About This Position?
// Another seemingly innocuous interview question, this is actually a perfect opportunity to stand out and show your passion for and connection to the company. For example, if you found out about the gig through a friend or professional contact, name-drop that person, then share why you were so excited about the job. If you discovered the company through an event or article, share that. Even if you found the listing through a random job board, share what, specifically, caught your eye about the role.
//
// Read More: 3 Ways People Mess Up the (Simple) Answer to “How Did You Come Across This Job Opportunity?”
//
// 3. Why Do You Want to Work at This Company?
// Beware of generic answers! If what you say can apply to a whole slew of other companies, or if your response makes you sound like every other candidate, you’re missing an opportunity to stand out. Zhang recommends one of four strategies: Do your research and point to something that makes the company unique that really appeals to you; talk about how you’ve watched the company grow and change since you first heard of it; focus on the organization’s opportunities for future growth and how you can contribute to it; or share what’s gotten you excited from your interactions with employees so far. Whichever route you choose, make sure to be specific. And if you can’t figure out why you’d want to work at the company you’re interviewing with by the time you’re well into the hiring process? It might be a red flag telling you that this position is not the right fit.
//
// Read More: 4 Better Ways to Answer “Why Do You Want to Work at This Company?”
//
// 4. Why Do You Want This Job?
// Again, companies want to hire people who are passionate about the job, so you should have a great answer about why you want the position. (And if you don’t? You probably should apply elsewhere.) First, identify a couple of key factors that make the role a great fit for you (e.g., “I love customer support because I love the constant human interaction and the satisfaction that comes from helping someone solve a problem”), then share why you love the company (e.g., “I’ve always been passionate about education, and I think you’re doing great things, so I want to be a part of it”).
//
// Read More: 3 Steps for Answering “Why Do You Want This Job?”
//
// 5. Why Should We Hire You?
// This interview question seems forward (not to mention intimidating!), but if you’re asked it, you’re in luck: There’s no better setup for you to sell yourself and your skills to the hiring manager. Your job here is to craft an answer that covers three things: that you can not only do the work, but also deliver great results; that you’ll really fit in with the team and culture; and that you’d be a better hire than any of the other candidates.
//
// Read More: 3 Better Ways to Answer “Why Should We Hire You?”
//
// 6. What Are Your Greatest Strengths?
// Here’s an opening to talk about something that makes you great—and a great fit for this role. When you’re answering this question, think quality, not quantity. In other words, don’t rattle off a list of adjectives. Instead, pick one or a few (depending on the question) specific qualities that are relevant to this position and illustrate them with examples. Stories are always more memorable than generalizations. And if there’s something you were hoping to mention because it makes you a great candidate, but you haven’t had a chance yet, this would be the perfect time.
//
// Read More: 3 Smart Strategies for Answering “What's Your Greatest Strength?”
//
// 7. What Do You Consider to Be Your Weaknesses?
// What your interviewer is really trying to do with this question—beyond identifying any major red flags—is to gauge your self-awareness and honesty. So, “I can’t meet a deadline to save my life” is not an option—but neither is “Nothing! I’m perfect!” Strike a balance by thinking of something that you struggle with but that you’re working to improve. For example, maybe you’ve never been strong at public speaking, but you’ve recently volunteered to run meetings to help you get more comfortable when addressing a crowd.
//
// Read More: 4 Ways to Answer “What Is Your Greatest Weakness?” That Actually Sound Believable
//
// Questions About Your Work History
// The meat of any job interview is your track record at work: what you accomplished, how you succeeded or failed (and how you dealt with it), and how you behaved in real time in actual work environments. If you prep a few versatile stories to tell about your work history and practice answering behavioral interview questions, you’ll be ready to go.
//
// 8. What Is Your Greatest Professional Achievement?
// Nothing says “hire me” better than a track record of achieving amazing results in past jobs, so don’t be shy when answering this interview question! A great way to do so is by using the STAR method: situation, task, action, results. Set up the situation and the task that you were required to complete to provide the interviewer with background context (e.g., “In my last job as a junior analyst, it was my role to manage the invoicing process”), then describe what you did (the action) and what you achieved (the result): “In one month, I streamlined the process, which saved my group 10 person-hours each month and reduced errors on invoices by 25%.”
//
// Read More: The Perfect Formula for Answering “What Is Your Greatest Accomplishment” in an Interview
//
// 9. Tell Me About a Challenge or Conflict You’ve Faced at Work, and How You Dealt With It.
// You’re probably not eager to talk about conflicts you’ve had at work during a job interview. But if you’re asked directly, don’t pretend you’ve never had one. Be honest about a difficult situation you’ve faced (but without going into the kind of detail you’d share venting to a friend). “Most people who ask are only looking for evidence that you’re willing to face these kinds of issues head-on and make a sincere attempt at coming to a resolution,” former recruiter Richard Moy says. Stay calm and professional as you tell the story (and answer any follow-up questions), spend more time talking about the resolution than the conflict, and mention what you’d do differently next time to show “you’re open to learning from tough experiences.”
//
// Read More: 3 Ways You’re Messing Up the Answer to “Tell Me About a Conflict You’ve Faced at Work”
//
// 10. Tell Me About a Time You Demonstrated Leadership Skills.
// You don’t have to have a fancy title to act like a leader or demonstrate leadership skills. Think about a time when you headed up a project, took the initiative to propose an alternate process, or helped motivate your team to get something done. Then use the STAR method to tell your interviewer a story, giving enough detail to paint a picture (but not so much that you start rambling) and making sure you spell out the result. In other words, be clear about why you’re telling this particular story and connect all the dots for the interviewer.
//
// Read More: The Best Way to Answer “Tell Me About a Time You Demonstrated Leadership Skills” in a Job Interview
//
// 11. What’s a Time You Disagreed With a Decision That Was Made at Work?
// The ideal anecdote here is one where you handled a disagreement professionally and learned something from the experience. Zhang recommends paying particular attention to how you start and end your response. To open, make a short statement to frame the rest of your answer, one that nods at the ultimate takeaway or the reason you’re telling this story. For example: “I learned early on in my professional career that it’s fine to disagree if you can back up your hunches with data.” And to close strong, you can either give a one-sentence summary of your answer (“In short…”) or talk briefly about how what you learned or gained from this experience would help you in the role you’re interviewing for.
//
// Read More: Here’s the Secret to Answering “Tell Me About a Time You Had a Conflict With Your Boss” in an Interview
//
// 12. Tell Me About a Time You Made a Mistake.
// You’re probably not too eager to dig into past blunders when you’re trying to impress an interviewer and land a job. But talking about a mistake and winning someone over aren’t mutually exclusive, Moy says. In fact, if you do it right, it can help you. The key is to be honest without placing blame on other people, then explain what you learned from your mistake and what actions you took to ensure it didn’t happen again. At the end of the day, employers are looking for folks who are self-aware, can take feedback, and care about doing better.
//
// Read More: 3 Rules That Guarantee You'll Nail the Answer to “Tell Me About a Time You Made a Mistake”
//
// 13. Tell Me About a Time You Failed.
// This question is very similar to the one about making a mistake, and you should approach your answer in much the same way. Make sure you pick a real, actual failure you can speak honestly about. Start by making it clear to the interviewer how you define failure. For instance: “As a manager, I consider it a failure whenever I’m caught by surprise. I strive to know what’s going on with my team and their work.” Then situate your story in relation to that definition and explain what happened. Finally, don’t forget to share what you learned. It’s OK to fail—everyone does sometimes—but it’s important to show that you took something from the experience.
//
// Read More: 4 Steps for Answering “Tell Me About a Time When You Failed”
//
// 14. Why Are You Leaving Your Current Job?
// This is a toughie, but one you can be sure you’ll be asked. Definitely keep things positive—you have nothing to gain by being negative about your current employer. Instead, frame things in a way that shows that you’re eager to take on new opportunities and that the role you’re interviewing for is a better fit for you. For example, “I’d really love to be part of product development from beginning to end, and I know I’d have that opportunity here.” And if you were let go from your most recent job? Keep it simple: “Unfortunately, I was let go,” is a totally acceptable answer.
//
// Read More: 4 Better Ways to Answer “Why Are You Leaving Your Job?”
//
// 15. Why Were You Fired?
// Of course, they may ask the follow-up question: Why were you let go? If you lost your job due to layoffs, you can simply say, “The company [reorganized/merged/was acquired] and unfortunately my [position/department] was eliminated.” But what if you were fired for performance reasons? Your best bet is to be honest (the job-seeking world is small, after all). But it doesn’t have to be a deal breaker. Frame it as a learning experience: Share how you’ve grown and how you approach your job and life now as a result. And if you can portray your growth as an advantage for this next job, even better.
//
// Read More: Stop Cringing! How to Tell an Interviewer You've Been Fired
//
// 16. Why Was There a Gap in Your Employment?
// Maybe you were taking care of children or aging parents, dealing with health issues, or traveling the world. Maybe it just took you a long time to land the right job. Whatever the reason, you should be prepared to discuss the gap (or gaps) on your resume. Seriously, practice saying your answer out loud. The key is to be honest, though that doesn’t mean you have to share more details than you’re comfortable with. If there are skills or qualities you honed or gained in your time away from the workforce—whether through volunteer work, running a home, or responding to a personal crisis—you can also talk about how those would help you excel in this role.
//
// Read More: How to Explain the Gap in Your Resume With Ease
//
// 17. Can You Explain Why You Changed Career Paths?
// Don’t be thrown off by this question—just take a deep breath and explain to the hiring manager why you’ve made the career decisions you have. More importantly, give a few examples of how your past experience is transferable to the new role. This doesn’t have to be a direct connection; in fact, it’s often more impressive when a candidate can show how seemingly irrelevant experience is very relevant to the role.
//
// Read More: How to Explain Your Winding Career Path to a Hiring Manager
//
// 18. What’s Your Current Salary?
// It’s now illegal for some or all employers to ask you about your salary history in several cities and states, including New York City; Louisville, North Carolina; California; and Massachusetts. But no matter where you live, it can be stressful to hear this question. Don’t panic—there are several possible strategies you can turn to. For example, you can deflect the question, Muse career coach Emily Liou says, with a response like: “Before discussing any salary, I’d really like to learn more about what this role entails. I’ve done a lot of research on [Company] and I am certain if it’s the right fit, we’ll be able to agree on a number that’s fair and competitive to both parties.” You can also reframe the question around your salary expectations or requirements (see question 38) or choose to share the number if you think it will work in your favor.
//
// Read More: Here's How You Answer the Illegal “What's Your Current Salary” Question
//
// 19. What Do You Like Least About Your Job?
// Tread carefully here! The last thing you want to do is let your answer devolve into a rant about how terrible your current company is or how much you hate your boss or that one coworker. The easiest way to handle this question with poise is to focus on an opportunity the role you’re interviewing for offers that your current job doesn’t. You can keep the conversation positive and emphasize why you’re so excited about the job.
//
// Read More: What Interviewers Really Want When They Ask, “What Do You Like Least About Your Job?”
//
// Questions About You and Your Goals
// Another crucial aspect of an interview? Getting to know a candidate. That’s why you’ll likely encounter questions about how you work, what you’re looking for (in a job, a team, a company, and a manager), and what your goals are. It’s a good sign if your interviewers want to make sure you’ll be a good fit—or add—to the team. Use it as an opportunity!
//
// 20. What Are You Looking for in a New Position?
// Hint: Ideally the same things that this position has to offer. Be specific.
//
// Read More: 4 Steps for Answering “What Are You Looking for in a New Position?”
//
// 21. What Type of Work Environment Do You Prefer?
// Hint: Ideally one that's similar to the environment of the company you're applying to. Be specific.
//
// Read More: 3 Steps to Answering “What Type of Work Environment Do You Prefer?”
//
// 22. What’s Your Management Style?
// The best managers are strong but flexible, and that’s exactly what you want to show off in your answer. (Think something like, “While every situation and every team member requires a bit of a different strategy, I tend to approach my employee relationships as a coach...”) Then share a couple of your best managerial moments, like when you grew your team from five to 15 or coached an underperforming employee to become the company’s top salesperson.
//
// Read More: How to Answer “What’s Your Management Style?”
//
// 23. How Would Your Boss and Coworkers Describe You?
// First, be honest (remember, if you make it to the final round, the hiring manager will be calling your former bosses and coworkers for references!). Then try to pull out strengths and traits you haven’t discussed in other aspects of the interview, such as your strong work ethic or your willingness to pitch in on other projects when needed.
//
// Read More: 3 Strategies for Answering “How Would Your Boss or Coworkers Describe You?”
//
// 24. How Do You Deal With Pressure or Stressful Situations?
// Here’s another question you may feel the urge to sidestep in an effort to prove you’re the perfect candidate who can handle anything. But it’s important not to dismiss this one (i.e. don’t say, “I just put my head down and push through it,” or, “I don’t get stressed out”). Instead, talk about your go-to strategies for dealing with stress (whether it’s meditating for 10 minutes every day or making sure you go for a run or keeping a super-detailed to-do list) and how you communicate and otherwise proactively try to mitigate pressure. If you can give a real example of a stressful situation you navigated successfully, all the better.
//
// Read More: 3 Ways You’re Messing Up the Answer to “How Do You Deal With Stressful Situations?”
//
// 25. What Do You Like to Do Outside of Work?
// Interviewers will sometimes ask about your hobbies or interests outside of work in order to get to know you a little better—to find out what you’re passionate about and devote time to during your off-hours. It’s another chance to let your personality shine. Be honest, but keep it professional and be mindful of answers that might make it sound like you’re going to spend all your time focusing on something other than the job you’re applying for.
//
// Read More: How to Answer “What Are Your Hobbies?” in an Interview (It’s Not a Trick Question!)
//
// 26. Are You Planning on Having Children?
// Questions about your family status, gender (“How would you handle managing a team of all men?”), nationality (“Where were you born?”), religion, or age are illegal—but they still get asked (and frequently). Of course, not always with ill intent—the interviewer might just be trying to make conversation and might not realize these are off-limits—but you should definitely tie any questions about your personal life (or anything else you think might be inappropriate) back to the job at hand. For this question, think: “You know, I’m not quite there yet. But I am very interested in the career paths at your company. Can you tell me more about that?”
//
// Read More: 5 Illegal Interview Questions and How to Dodge Them
//
// 27. How Do You Prioritize Your Work?
// Your interviewers want to know that you can manage your time, exercise judgement, communicate, and shift gears when needed. Start by talking about whatever system you’ve found works for you to plan your day or week, whether it’s a to-do list app you swear by or a color-coded spreadsheet. This is one where you’ll definitely want to lean on a real-life example. So go on to describe how you’ve reacted to a last-minute request or another unexpected shift in priorities in the past, incorporating how you evaluated and decided what to do and how you communicated with your manager and/or teammates about it.
//
// Read More: A Foolproof Method to Answer the Interview Question “How Do You Prioritize Your Work?”
//
// 28. What Are You Passionate About?
// You’re not a robot programmed to do your work and then power down. You’re a human, and if someone asks you this question in an interview, it’s probably because they want to get to know you better. The answer can align directly with the type of work you’d be doing in that role—like if, for example, you’re applying to be a graphic designer and spend all of your free time creating illustrations and data visualizations to post on Instagram.
//
// But don’t be afraid to talk about a hobby that’s different from your day-to-day work. Bonus points if you can “take it one step further and connect how your passion would make you an excellent candidate for the role you are applying for,” says Muse career coach Al Dea. Like if you’re a software developer who loves to bake, you might talk about how the ability to be both creative and precise informs your approach to code.
//
// Read More: 3 Authentic Ways to Answer “What Are You Passionate About?” in a Job Interview
//
// 29. What Motivates You?
// Before you panic about answering what feels like a probing existential question, consider that the interviewer wants to make sure you’re excited about this role at this company, and that you’ll be motivated to succeed if they pick you. So think back to what has energized you in previous roles and pinpoint what made your eyes light up when you read this job description. Pick one thing, make sure it’s relevant to the role and company you’re interviewing for, and try to weave in a story to help illustrate your point. If you’re honest, which you should be, your enthusiasm will be palpable.
//
// Read More: 5 Easy Steps to Answer “What Motivates You?” in an Interview
//
// 30. What Are Your Pet Peeves?
// Here’s another one that feels like a minefield. But it’ll be easier to navigate if you know why an interviewer is asking it. Most likely, they want to make sure you’ll thrive at their company—and get a glimpse of how you deal with conflict. So be certain you pick something that doesn’t contradict the culture and environment at this organization while still being honest. Then explain why and what you’ve done to address it in the past, doing your best to stay calm and composed. Since there’s no need to dwell on something that annoys you, you can keep this response short and sweet.
//
// Read More: 6 Tips for Answering “What Are Your Pet Peeves?” in an Interview
//
// 31. How Do You Like to Be Managed?
// This is another one of those questions that’s about finding the right fit—both from the company’s perspective and your own. Think back on what worked well for you in the past and what didn’t. What did previous bosses do that motivated you and helped you succeed and grow? Pick one or two things to focus on and always articulate them with a positive framing (even if your preference comes from an experience where your manager behaved in the opposite way, phrase it as what you would want a manager to do). If you can give a positive example from a great boss, it’ll make your answer even stronger.
//
// Read More: 3 Easy Steps to Answer “How Do You Like to Be Managed?” in an Interview
//
// 32. Where Do You See Yourself in Five Years?
// If asked this question, be honest and specific about your future goals, but consider this: A hiring manager wants to know a) if you've set realistic expectations for your career, b) if you have ambition (a.k.a., this interview isn't the first time you’re considering the question), and c) if the position aligns with your goals and growth. Your best bet is to think realistically about where this position could take you and answer along those lines. And if the position isn’t necessarily a one-way ticket to your aspirations? It’s OK to say that you’re not quite sure what the future holds, but that you see this experience playing an important role in helping you make that decision.
//
// Read More: How to Answer “Where Do You See Yourself in 5 Years?”
//
// 33. What’s Your Dream Job?
// Along similar lines, the interviewer wants to uncover whether this position is really in line with your ultimate career goals. While “an NBA star” might get you a few laughs, a better bet is to talk about your goals and ambitions—and why this job will get you closer to them.
//
// Read More: The Secret Formula to Answering “What's Your Dream Job?” in an Interview
//
// 34. What Other Companies Are You Interviewing With?
// Companies might ask you who else you’re interviewing with for a few reasons. Maybe they want to see how serious you are about this role and team (or even this field) or they’re trying to find out who they’re competing with to hire you. On one hand, you want to express your enthusiasm for this job, but at the same time, you don’t want to give the company any more leverage than it already has by telling them there’s no one else in the running. Depending on where you are in your search, you can talk about applying to or interviewing for a few roles that have XYZ in common—then mention how and why this role seems like a particularly good fit.
//
// Read More: How to Answer “What Other Companies Are You Interviewing With?”
//
// 35. What Makes You Unique?
// “They genuinely want to know the answer,” Dea promises. Give them a reason to pick you over other similar candidates. The key is to keep your answer relevant to the role you’re applying to. So the fact that you can run a six-minute mile or crush a trivia challenge might not help you get the job (but hey, it depends on the job!). Use this opportunity to tell them something that would give you an edge over your competition for this position. To figure out what that is, you can ask some former colleagues, think back to patterns you’ve seen in feedback you get, or try to distill why people tend to turn to you. Focus on one or two things and don’t forget to back up whatever you say with evidence.
//
// Read More: A Simple Way to Answer “What Makes You Unique?” in Your Job Search (Plus, Examples!)
//
// 36. What Should I Know That’s Not on Your Resume?
// It’s a good sign if a recruiter or hiring manager is interested in more than just what’s on your resume. It probably means they looked at your resume, think you might be a good fit for the role, and want to know more about you. To make this wide-open question a little more manageable, try talking about a positive trait, a story or detail that reveals a little more about you and your experience, or a mission or goal that makes you excited about this role or company.
//
// Read More: The Right Way to Answer “What Should I Know That’s Not on Your Resume?”
//
// Questions About the Job
// At the end of the day, the people on the other side of the hiring process want to make sure you could take on this role. That means they might ask you logistical questions to ensure that timing and other factors are aligned, and they might have you imagine what you’d do after starting.
//
// 37. What Would Your First 30, 60, or 90 Days Look Like in This Role?
// Your potential future boss (or whoever else has asked you this question) wants to know that you’ve done your research, given some thought to how you’d get started, and would be able to take initiative if hired. So think about what information and aspects of the company and team you’d need to familiarize yourself with and which colleagues you’d want to sit down and talk to. You can also suggest one possible starter project to show you’d be ready to hit the ground running and contribute early on. This won’t necessarily be the thing you do first if you do get the job, but a good answer shows that you’re thoughtful and that you care.
//
// Read More: The 30-60-90 Day Plan: Your Secret Weapon for New Job Success
//
// 38. What Are Your Salary Expectations?
// The number one rule of answering this question is: Figure out your salary requirements ahead of time. Do your research on what similar roles pay by using sites like PayScale and reaching out to your network. Be sure to take your experience, education, skills, and personal needs into account, too! From there, Muse career coach Jennifer Fink suggests choosing from one of three strategies:
//
// Give a salary range: But keep the bottom of your stated range toward the mid-to-high point of what you’re actually hoping for, Fink says.
// Flip the question: Try something like “That's a great question—it would be helpful if you could share what the range is for this role,” Fink says.
// Delay answering: Tell your interviewer that you’d like to learn more about the role or the rest of the compensation package before discussing pay.
// (Need help responding to a question about your salary requirements on an application form? Read this.)
//
// Read More: 3 Strategies for Answering “What Are Your Salary Expectations?” in an Interview
//
// 39. What Do You Think We Could Do Better or Differently?
// This question can really do a number on you. How do you give a meaty answer without insulting the company or, worse, the person you’re speaking with? Well first, take a deep breath. Then start your response with something positive about the company or specific product you’ve been asked to discuss. When you’re ready to give your constructive feedback, give some background on the perspective you’re bringing to the table and explain why you’d make the change you’re suggesting (ideally based on some past experience or other evidence). And if you end with a question, you can show them you’re curious about the company or product and open to other points of view. Try: “Did you consider that approach here? I’d love to know more about your process.”
//
// Read More: How to Answer the “How Would You Improve Our Company?” Interview Question Without Bashing Anyone
//
// 40. When Can You Start?
// Your goal here should be to set realistic expectations that will work for both you and the company. What exactly that sounds like will depend on your specific situation. If you’re ready to start immediately—if you’re unemployed, for example—you could offer to start within the week. But if you need to give notice to your current employer, don’t be afraid to say so; people will understand and respect that you plan to wrap things up right. It’s also legitimate to want to take a break between jobs, though you might want to say you have “previously scheduled commitments to attend to” and try to be flexible if they really need someone to start a bit sooner.
//
// Read More: 4 Ways to Answer the Interview Question “When Can You Start?”
//
// 41. Are You Willing to Relocate?
// While this may sound like a simple yes-or-no question, it’s often a little bit more complicated than that. The simplest scenario is one where you’re totally open to moving and would be willing to do so for this opportunity. But if the answer is no, or at least not right now, you can reiterate your enthusiasm for the role, briefly explain why you can’t move at this time, and offer an alternative, like working remotely or out of a local office. Sometimes it’s not as clear-cut, and that’s OK. You can say you prefer to stay put for xyz reasons, but would be willing to consider relocating for the right opportunity.
//
// Read More: The Best Responses to “Are You Willing to Relocate?” Depending on Your Situation
//
// Questions That Test You
// Depending on the style of the interviewer and company, you could get some pretty quirky questions. They’re often testing how you think through something on the spot. Don’t panic. Take a moment to think—and remember, there’s no one single correct answer or approach.
//
// 42. How Many Tennis Balls Can You Fit Into a Limousine?
// 1,000? 10,000? 100,000? Seriously? Well, seriously, you might get asked brain-teaser questions like these, especially in quantitative jobs. But remember that the interviewer doesn’t necessarily want an exact number—they want to make sure that you understand what’s being asked of you, and that you can set into motion a systematic and logical way to respond. So take a deep breath and start thinking through the math. (Yes, it’s OK to ask for a pen and paper!)
//
// Read More: 9 Steps to Solving an Impossible Brain Teaser in a Tech Interview (Without Breaking a Sweat)
//
// 43. If You Were an Animal, Which One Would You Want to Be?
// Seemingly random personality-test type questions like these come up in interviews because hiring managers want to see how you can think on your feet. There’s no wrong answer here, but you’ll immediately gain bonus points if your answer helps you share your strengths or personality or connect with the hiring manager. Pro tip: Come up with a stalling tactic to buy yourself some thinking time, such as saying, “Now, that is a great question. I think I would have to say…”
//
// Read More: 4 Steps for Answering Off-the-Wall Interview Questions
//
// 44. Sell Me This Pen.
// If you’re interviewing for a sales job, your interviewer might put you on the spot to sell them a pen sitting on the table, or a legal pad, or a water bottle, or just something. The main thing they’re testing you for? How you handle a high-pressure situation. So try to stay calm and confident and use your body language—making eye contact, sitting up straight, and more—to convey that you can handle this. Make sure you listen, understand your “customer’s” needs, get specific about the item’s features and benefits, and end strong—as though you were truly closing a deal.
//
// Read More: 4 Tips for Responding to "Sell Me This Pen" in an Interview
//
// Wrapping-Up Questions
// When it comes time for the interview to wind down, you might have a chance to add any last thoughts and you’ll almost certainly have time to ask the questions that will help you decide if this company and role might be great for you. In fact, if they don’t leave time for you to ask any questions at any of your interviews, that might be a red flag in itself.
//
// 45. Is There Anything Else You’d Like Us to Know?
// Just when you thought you were done, your interviewer asks you this open-ended doozy. Don’t panic—it’s not a trick question! You can use this as an opportunity to close out the meeting on a high note in one of two ways, Zhang says. First, if there really is something relevant that you haven’t had a chance to mention, do it now. Otherwise, you can briefly summarize your qualifications. For example, Zhang says, you could say: “I think we’ve covered most of it, but just to summarize, it sounds like you’re looking for someone who can really hit the ground running. And with my previous experience [enumerate experience here], I think I’d be a great fit.”
//
// Read More: How to Answer “Is There Anything Else You’d Like Us to Know?”
//
// 46. Do You Have Any Questions for Us?
// You probably already know that an interview isn’t just a chance for a hiring manager to grill you—it’s an opportunity to sniff out whether a job is the right fit from your perspective. What do you want to know about the position? The company? The department? The team? You’ll cover a lot of this in the actual interview, so have a few less-common questions ready to go. We especially like questions targeted to the interviewer (“What's your favorite part about working here?”) or the company’s growth (“What can you tell me about your new products or plans for growth?”) If you’re interviewing for a remote role, there are some specific questions you might want to ask related to that.
