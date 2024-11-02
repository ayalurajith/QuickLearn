import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({
  children,
  title = "Quick Learn ",
  description = "The Quick Learn recruits for state government positions and conducts national exams for roles like IAS and IPS, both ensuring a skilled public workforce in India.",
  keywords = "Public Service Commission, Recruitment, Civil Services, Government Jobs, Competitive Exams, Selection Process, Exam Pattern, Syllabus, Eligibility Criteria, Notification, Application Process, Interview, Study Materials, Test Series, Previous Year Papers, Kerala PSC, Kerala Public Service Commission, KPSC Exam, Kerala PSC Notifications, State Service Exams, Kerala PSC Previous Papers, Kerala PSC Syllabus, KPSC Study Materials, PSC Rank List, PSC Eligibility Criteria, Kerala PSC Online Registration, PSC Coaching Institutes, Local Body Exams, Kerala PSC Current Affairs, UPSC, Union Public Service Commission, UPSC Civil Services Exam, IAS Exam, IPS Exam, IFS Exam, UPSC Syllabus, UPSC Notification, UPSC Application Process, UPSC Mains, UPSC Prelims, UPSC Interview, UPSC Study Resources, UPSC Test Series, UPSC Previous Year Papers, National Defence Academy (NDA), Combined Defence Services (CDS), Study Plan, Study Schedule, Revision Techniques, Mock Tests, Time Management, Note-taking, Study Groups, Online Courses, Video Lectures, E-books, Reference Books, Current Affairs Magazines, Daily News Analysis, Coaching Classes, Educational Apps.",
  author = "ajith-balan"
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="flex-grow">
        <ToastContainer/>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
