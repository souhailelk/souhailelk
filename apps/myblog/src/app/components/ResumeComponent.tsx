import ResumeName from './ResumeNameComponent';
import Description from './DescriptionComponent';
import Experiences from './ExperiencesComponent';
import Projects from './ProjectsComponents';
import Educations from './EducationsComponent';

import {Resume } from '@souhailelk/myblog.domain';
import { useEffect, useState } from 'react';
import ResumeRepository from '../repositories/ResumeRepository';

function ResumeComponent() {
  const [resume, setResume] = useState<Resume>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let repository = new ResumeRepository();
        const response = await repository.getResume();
        setResume(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }
  if (!resume) {
    return <div>Article not found</div>;
  }
    return (
        <div className="flex justify-center overflow-hidden rounded">
            <div className="w-screen min-h-screen box-content max-w-screen-lg shadow-lg px-6 py-4 m-2">
                <ResumeName completName={resume.completName} />
                <Description description={resume.description} />
                <Experiences experiences={resume.experiences} />
                <Projects projects={resume.projects} />
                <Educations educations={resume.educations} />
            </div>
        </div>
    )
}
export default ResumeComponent;