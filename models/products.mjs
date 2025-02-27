import { DataTypes } from 'sequelize';
import sequelize from '../config/db.mjs';

const Product = sequelize.define('productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false

  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
   stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }, 
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true
  }

}, {
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'updated_at',
  tableName: 'productos'
});

export default Product;
