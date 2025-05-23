import { DataTypes } from 'sequelize';

const CourseModel = (sequelize) => {
  return sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    duration: {
      type: DataTypes.INTEGER,
      comment: 'Duration in minutes'
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    totalLessons: {
  type: DataTypes.INTEGER,
  defaultValue: 0
},
isBuiltIn: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
},
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    objectives: {
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'published'
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (course) => {
        if (course.content) {
          // Подсчет общего количества уроков из контента
          const lessons = course.content.sections?.reduce((acc, section) => 
            acc + (section.lessons?.length || 0), 0) || 0;
          course.totalLessons = lessons;
        }
      },
      beforeUpdate: async (course) => {
        if (course.changed('content')) {
          const lessons = course.content.sections?.reduce((acc, section) => 
            acc + (section.lessons?.length || 0), 0) || 0;
          course.totalLessons = lessons;
        }
      }
    }
  });
};

export default CourseModel;
