import sequelize from '../config/dbConfig.js';

import UserModel from './User.js';
import CourseModel from './Course.js';
import BlockModel from './Block.js';
import LessonModel from './Lesson.js';
import QuestionModel from './Question.js';
import CourseProgressModel from './CourseProgress.js';
import LessonProgressModel from './LessonProgress.js';
import UserProgressModel from './UserProgress.js';
import EventModel from './Event.js';
import PracticalAssignmentModel from './PracticalAssignment.js';
import CourseLogModel from './CourseLog.js';
import LectureModel from './Lecture.js';

// Инициализация моделей
const User = UserModel(sequelize);
const Course = CourseModel(sequelize);
const Block = BlockModel(sequelize);
const Lesson = LessonModel(sequelize);
const Question = QuestionModel(sequelize);
const CourseProgress = CourseProgressModel(sequelize);
const LessonProgress = LessonProgressModel(sequelize);
const UserProgress = UserProgressModel(sequelize);
const Event = EventModel(sequelize);
const PracticalAssignment = PracticalAssignmentModel(sequelize);
const CourseLog = CourseLogModel(sequelize);
const Lecture = LectureModel(sequelize);

// Ассоциации
Course.hasMany(Block, { foreignKey: 'CourseId', onDelete: 'CASCADE' });
Block.belongsTo(Course, { foreignKey: 'CourseId' });

Block.hasMany(Lesson, { foreignKey: 'BlockId', onDelete: 'CASCADE' });
Lesson.belongsTo(Block, { foreignKey: 'BlockId' });

Lesson.hasMany(Question, {
  foreignKey: 'LessonId',
  as: 'Questions',
  onDelete: 'CASCADE'
});
Question.belongsTo(Lesson, { foreignKey: 'LessonId' });

Lesson.hasMany(PracticalAssignment, {
  foreignKey: 'LessonId',
  as: 'PracticalAssignments',
  onDelete: 'CASCADE'
});
PracticalAssignment.belongsTo(Lesson, {
  foreignKey: 'LessonId',
  as: 'Lesson'
});

// Прогресс 
CourseProgress.belongsTo(User, { foreignKey: 'userId' });
CourseProgress.belongsTo(Course, { foreignKey: 'courseId' });
User.hasMany(CourseProgress, { foreignKey: 'userId' });
Course.hasMany(CourseProgress, { foreignKey: 'courseId' });

LessonProgress.belongsTo(User, { foreignKey: 'userId' });
LessonProgress.belongsTo(Lesson, { foreignKey: 'lessonId' });
LessonProgress.belongsTo(Course, { foreignKey: 'courseId' });
User.hasMany(LessonProgress, { foreignKey: 'userId' });
Lesson.hasMany(LessonProgress, { foreignKey: 'lessonId' });
Course.hasMany(LessonProgress, { foreignKey: 'courseId' });

User.hasMany(UserProgress, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserProgress.belongsTo(User, { foreignKey: 'userId' });


User.hasMany(Event, { onDelete: 'CASCADE' });
Event.belongsTo(User);

// Новые связи
Course.hasMany(CourseLog, { foreignKey: 'courseId' });
CourseLog.belongsTo(Course, { foreignKey: 'courseId' });

Lesson.hasMany(Lecture, { foreignKey: 'LessonId' });
Lecture.belongsTo(Lesson, { foreignKey: 'LessonId' });
Event.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Event, { foreignKey: 'courseId' });
Event.belongsTo(Course, { foreignKey: 'courseId' });
Event.belongsTo(Lesson, { foreignKey: 'lessonId' });
Lesson.hasMany(Event, { foreignKey: 'lessonId' });  
Event.belongsTo(Lesson, { foreignKey: 'lessonId' }); 

export {
  sequelize,
  User,
  Course,
  Block,
  Lesson,
  Question,
  CourseProgress,
  LessonProgress,
  UserProgress,
  Event,
  PracticalAssignment,
  CourseLog,
  Lecture
};
