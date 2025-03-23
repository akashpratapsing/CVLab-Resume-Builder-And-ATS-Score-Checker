import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resumePreview, setResumePreview] = useState(null);

  const addField = (section) => {
    const uniqueId = `${section}-${Date.now()}`;
    
    if (section === 'education') {
      setEducation([...education, { 
        id: uniqueId,
        institution: '',
        location: '',
        degree: '',
        dates: ''
      }]);
    } else if (section === 'experience') {
      setExperience([...experience, { 
        id: uniqueId,
        title: '',
        company: '',
        location: '',
        dates: '',
        details: ['']
      }]);
    } else if (section === 'projects') {
      setProjects([...projects, { 
        id: uniqueId,
        name: '',
        dates: '',
        tech: '',
        details: ['']
      }]);
    }
  };

  const addDetailInput = (section, id) => {
    if (section === 'experience') {
      setExperience(experience.map(exp => 
        exp.id === id ? { ...exp, details: [...exp.details, ''] } : exp
      ));
    } else if (section === 'projects') {
      setProjects(projects.map(proj => 
        proj.id === id ? { ...proj, details: [...proj.details, ''] } : proj
      ));
    }
  };

  const removeDetailInput = (section, id, detailIndex) => {
    if (section === 'experience') {
      setExperience(experience.map(exp => {
        if (exp.id === id && exp.details.length > 1) {
          const updatedDetails = exp.details.filter((_, index) => index !== detailIndex);
          return { ...exp, details: updatedDetails };
        }
        return exp;
      }));
    } else if (section === 'projects') {
      setProjects(projects.map(proj => {
        if (proj.id === id && proj.details.length > 1) {
          const updatedDetails = proj.details.filter((_, index) => index !== detailIndex);
          return { ...proj, details: updatedDetails };
        }
        return proj;
      }));
    }
  };

  const removeField = (section, id) => {
    if (section === 'education') {
      setEducation(education.filter(edu => edu.id !== id));
    } else if (section === 'experience') {
      setExperience(experience.filter(exp => exp.id !== id));
    } else if (section === 'projects') {
      setProjects(projects.filter(proj => proj.id !== id));
    }
  };

  const handleChange = (section, id, field, value, detailIndex = null) => {
    if (section === 'education') {
      setEducation(education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      ));
    } else if (section === 'experience') {
      setExperience(experience.map(exp => {
        if (exp.id === id) {
          if (detailIndex !== null) {
            const updatedDetails = [...exp.details];
            updatedDetails[detailIndex] = value;
            return { ...exp, details: updatedDetails };
          }
          return { ...exp, [field]: value };
        }
        return exp;
      }));
    } else if (section === 'projects') {
      setProjects(projects.map(proj => {
        if (proj.id === id) {
          if (detailIndex !== null) {
            const updatedDetails = [...proj.details];
            updatedDetails[detailIndex] = value;
            return { ...proj, details: updatedDetails };
          }
          return { ...proj, [field]: value };
        }
        return proj;
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formattedData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      linkedin: formData.get('linkedin'),
      github: formData.get('github'),
      education: education,
      experience: experience,
      projects: projects,
      skills: {
        languages: formData.get('languages')?.split(',').map(s => s.trim()) || [],
        frameworks: formData.get('frameworks')?.split(',').map(s => s.trim()) || [],
        tools: formData.get('tools')?.split(',').map(s => s.trim()) || [],
        libraries: formData.get('libraries')?.split(',').map(s => s.trim()) || [],
      },
    };

    console.log('Formatted Data:', JSON.stringify(formattedData, null, 2));

  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/resume/generate', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formattedData),
  //     });

  //     if (!response.ok) throw new Error('Failed to generate resume');

  //     const blob = await response.blob();
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = 'resume.pdf';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Error generating resume. Please try again.');
  //   }
  // };

  try {
    const response = await axios.post('http://127.0.0.1:5000/resume/generate', formattedData, {
      responseType: 'blob'
    });

    if (!response.data) throw new Error('Failed to generate resume');

    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setResumePreview(pdfUrl);  // ✅ Store preview URL

  } catch (error) {
    console.error('Error:', error);
    alert('Error generating resume. Please try again.');
  }
};

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Generate Your Resume</h2>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form id="resumeForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <input type="text" name="name" placeholder="Full Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="text" name="phone" placeholder="Phone" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <input type="text" name="linkedin" placeholder="LinkedIn URL" className="input input-bordered" />
                </div>
                <div className="form-control md:col-span-2">
                  <input type="text" name="github" placeholder="GitHub URL" className="input input-bordered" />
                </div>
              </div>

              {/* Education Section */}
              <div className="divider"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Education</h3>
                <button 
                  type="button" 
                  onClick={() => addField('education')} 
                  className="btn btn-primary btn-sm"
                >
                  Add Education
                </button>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className="card bg-base-200 shadow-sm">
                    <div className="card-body pt-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Institution" 
                            className="input input-bordered" 
                            value={edu.institution}
                            onChange={(e) => handleChange('education', edu.id, 'institution', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Location" 
                            className="input input-bordered" 
                            value={edu.location}
                            onChange={(e) => handleChange('education', edu.id, 'location', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Degree" 
                            className="input input-bordered" 
                            value={edu.degree}
                            onChange={(e) => handleChange('education', edu.id, 'degree', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Dates (e.g., 2020-2024)" 
                            className="input input-bordered" 
                            value={edu.dates}
                            onChange={(e) => handleChange('education', edu.id, 'dates', e.target.value)}
                            required 
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button 
                          type="button" 
                          onClick={() => removeField('education', edu.id)} 
                          className="btn btn-error btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience Section */}
              <div className="divider"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Experience</h3>
                <button 
                  type="button" 
                  onClick={() => addField('experience')} 
                  className="btn btn-primary btn-sm"
                >
                  Add Experience
                </button>
              </div>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="card bg-base-200 shadow-sm">
                    <div className="card-body pt-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Job Title" 
                            className="input input-bordered" 
                            value={exp.title}
                            onChange={(e) => handleChange('experience', exp.id, 'title', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Company" 
                            className="input input-bordered" 
                            value={exp.company}
                            onChange={(e) => handleChange('experience', exp.id, 'company', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Location" 
                            className="input input-bordered" 
                            value={exp.location}
                            onChange={(e) => handleChange('experience', exp.id, 'location', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Dates" 
                            className="input input-bordered" 
                            value={exp.dates}
                            onChange={(e) => handleChange('experience', exp.id, 'dates', e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <label className="text-sm font-medium">Experience Details</label>
                        <div className="space-y-2 mt-1">
                          {exp.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="form-control flex flex-row gap-2">
                              <input 
                                type="text" 
                                placeholder={`Detail ${detailIndex + 1}`} 
                                className="input input-bordered flex-grow" 
                                value={detail}
                                onChange={(e) => handleChange('experience', exp.id, 'details', e.target.value, detailIndex)}
                                required 
                              />
                              {exp.details.length > 1 && (
                                <button 
                                  type="button" 
                                  onClick={() => removeDetailInput('experience', exp.id, detailIndex)} 
                                  className="btn btn-square btn-error btn-sm"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <button 
                            type="button" 
                            onClick={() => addDetailInput('experience', exp.id)} 
                            className="btn btn-outline btn-sm mt-2"
                          >
                            Add Detail
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end mt-2">
                        <button 
                          type="button" 
                          onClick={() => removeField('experience', exp.id)} 
                          className="btn btn-error btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects Section */}
              <div className="divider"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Projects</h3>
                <button 
                  type="button" 
                  onClick={() => addField('projects')} 
                  className="btn btn-primary btn-sm"
                >
                  Add Project
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={proj.id} className="card bg-base-200 shadow-sm">
                    <div className="card-body pt-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Project Name" 
                            className="input input-bordered" 
                            value={proj.name}
                            onChange={(e) => handleChange('projects', proj.id, 'name', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control">
                          <input 
                            type="text" 
                            placeholder="Dates" 
                            className="input input-bordered" 
                            value={proj.dates}
                            onChange={(e) => handleChange('projects', proj.id, 'dates', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-control md:col-span-2">
                          <input 
                            type="text" 
                            placeholder="Technologies Used" 
                            className="input input-bordered" 
                            value={proj.tech}
                            onChange={(e) => handleChange('projects', proj.id, 'tech', e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <label className="text-sm font-medium">Project Details</label>
                        <div className="space-y-2 mt-1">
                          {proj.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="form-control flex flex-row gap-2">
                              <input 
                                type="text" 
                                placeholder={`Detail ${detailIndex + 1}`} 
                                className="input input-bordered flex-grow" 
                                value={detail}
                                onChange={(e) => handleChange('projects', proj.id, 'details', e.target.value, detailIndex)}
                                required 
                              />
                              {proj.details.length > 1 && (
                                <button 
                                  type="button" 
                                  onClick={() => removeDetailInput('projects', proj.id, detailIndex)} 
                                  className="btn btn-square btn-error btn-sm"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <button 
                            type="button" 
                            onClick={() => addDetailInput('projects', proj.id)} 
                            className="btn btn-outline btn-sm mt-2"
                          >
                            Add Detail
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end mt-2">
                        <button 
                          type="button" 
                          onClick={() => removeField('projects', proj.id)} 
                          className="btn btn-error btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="divider"></div>
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <input 
                    type="text" 
                    name="languages" 
                    placeholder="Languages" 
                    className="input input-bordered" 
                  />
                </div>
                <div className="form-control">
                  <input 
                    type="text" 
                    name="frameworks" 
                    placeholder="Frameworks" 
                    className="input input-bordered" 
                  />
                </div>
                <div className="form-control">
                  <input 
                    type="text" 
                    name="tools" 
                    placeholder="Developer Tools" 
                    className="input input-bordered" 
                  />
                </div>
                <div className="form-control">
                  <input 
                    type="text" 
                    name="libraries" 
                    placeholder="Libraries" 
                    className="input input-bordered" 
                  />
                </div>
              </div>

               {/* ✅ Resume Preview Section */}
               {resumePreview && (
                <div className="flex flex-col items-center mt-4">
                  <h3 className="text-lg font-semibold">Resume Preview</h3>
                  <iframe src={resumePreview} width="100%" height="500px" />
                  <button 
                    className="btn btn-primary mt-4"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = resumePreview;
                      link.download = 'resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download Resume
                  </button>
                </div>
              )}

              <div className="divider"></div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Generate Resume
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;