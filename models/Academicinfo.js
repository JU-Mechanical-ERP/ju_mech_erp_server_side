import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  semester: Number,
  sgpa: String,
  cgpa: String,
});

const academicInfoSchema = new mongoose.Schema({
  grades: [GradeSchema],
  selectedProfessional: [String],
  selectedOpen: [String],
  projectDetails: [
    {
      title: String,
      type: String,
      mode: String,
      duration: Number,
      year: Number,
      graded: Boolean,
      supervisor: String,
      coSupervisor: String,
      institute: String,
      sdgConnection: Boolean,
      outcome: String,
      certificates: [{ url: String }]
    }
  ],
  publications: {
    journalPapers: [
      { title: String, journalName: String, volume: String, pageNo: String, doi: String, firstPage: String }
    ],
    conferencePapers: [
      { title: String, conferenceName: String, venue: String, dates: String, organizedBy: String }
    ],
    patent: [
      { title: String, details: String, applno: String, patno: String, patcert: String }
    ]
  },
  courses: [
    {
      name: String,
      duration: String,
      mode: String,
      noCredits: String,
      platform: String,
      instituteName: String,
      facultyName: String,
      curriculumPart: Boolean,
      creditTransfer: Boolean,
      gradeCard: String,
      cert: String
    }
  ],
  trainings: [
    {
      place: String,
      duration: Number,
      mode: String,
      noCredits: String,
      organizedBy: String,
      cert: String
    }
  ],
  interns: [
    {
      place: String,
      duration: Number,
      mode: String,
      noCredits: String,
      organizedBy: String,
      cert: String
    }
  ],
  remedial: [{ num: Number, name: String }],
  coCurricular: {
    clubs: [{ type: String, name: String, role: String, accolades: String, cert: String }],
    competitions: [
      { name: String, organizedBy: String, nature: String, year: Number, role: String, outcome: String, cert: String, teammates: [{ String }] }
    ],
    leadershipRoles: [{ title: String, details: String }],
    sports: [{ event: String, level: String, venue: String, year: Number, result: String }]
  },
  sports: [
    { name: String, level: String, outside: Boolean, year: String, venue: String, result: String, achievements: String, cert: String }
  ],
  skills: {
    technical: [String],
    certifications: [String],
    softSkills: [String],
    languages: [{ name: String, mode: String, duration: String, fees: Boolean, cert: String }],
    coding: [{ name: String, mode: String, duration: String, fees: Boolean, cert: String }]
  },
  socialActivities: {
    nss: Boolean,
    extensionActivities: [{ name: String, details: String, date: Date, venue: String }],
    seminars: [{ name: String, venue: String, date: Date, organizedBy: String }]
  },
  seminar: [{ name: String, venue: String, date: String, organizedBy: String, cert: String }]
});

export default academicInfoSchema;
