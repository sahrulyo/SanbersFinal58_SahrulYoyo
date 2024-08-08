import { Request, Response } from "express";
import ProductsModel from "../models/products.model";
import CategoriesModel from "../models/categories.model";
import *  as Yup from 'yup';



const createValidationSchema = Yup.object().shape(
  {
    name: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    images: Yup.string().required(),
    category: Yup.string().required(),
    qty: Yup.number().required().min(1),
  }
);

interface IPaginationQuery {
  page: number;
  limit: number;
  search?:string;
}



export default {
  // create------------------------------------------------> REVISI CODE
  async create(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const { name, description, images, price, qty, category } = req.body;

      // Cek apakah kategori ada
      const categoryExists = await CategoriesModel.findById(category);
      if (!categoryExists) {
        return res.status(400).json({
          message: "Category does not exist",
        });
      }

      // Simpan produk baru
      const newProduct = await ProductsModel.create({
        name,
        description,
        images,
        price,
        qty,
        category
      });

      // Populate category details
      const populatedProduct = await ProductsModel.findById(newProduct._id).populate('category');

      res.status(201).json({
        data: populatedProduct,
        message: "Success create product",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError){
        res.status(400).json({
          data: error.errors,
          message: "Failed create product",
        });
        return;
      }
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create product",
      });
    }
  },

  // find all ------------------------------------------------>
  async findAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const query: any = {};

      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i"},
        });
      }
      const result = await ProductsModel.find(query)
      .limit(+limit)
      .skip((+page - 1) *  + limit)
      .sort({ createAt: -1})
      .populate('category');

      const total = await ProductsModel.countDocuments(query);

      res.status(200).json({
        data: result,
        message: "Success find all products",
        page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / +limit),
      });
     
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all products",
      });
    }
  },
  
  // find one ------------------------------------------------>
  async findOne(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOne({
        _id: req.params.id,
      }).populate('category');
      res.status(200).json({
        data: result,
        message: "Success get one product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },

  // update ------------------------------------------------>
  async update(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      ).populate('category');

      res.status(200).json({
        data: result,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },

  // delete ------------------------------------------------>
  async delete(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOneAndDelete({
        _id: req.params.id,
      });

      res.status(200).json({
        data: result,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};