import { DataTypes } from 'sequelize';
import sequelize from '../config/db.mjs';

const Product = sequelize.define('Product', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Product;