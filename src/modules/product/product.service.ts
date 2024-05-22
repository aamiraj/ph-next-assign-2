import { TProduct } from "./product.interface";
import Product from "./product.model";

const createAProductInDb = async (data: TProduct) => {
  try {
    const result = await Product.create(data);
    return {
      success: true,
      message: "Product created successfully.",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create product.",
      data: error,
    };
  }
};

const findAllProductsFromDB = async () => {
  try {
    const results = await Product.find({});

    if (results?.length === 0) {
      return {
        success: true,
        message: "No products found.",
        data: null,
      };
    }

    return {
      success: true,
      message: "All products found successfully.",
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to find all products.",
      data: error,
    };
  }
};

const findAProductFromDb = async (id: string) => {
  try {
    const result = await Product.findById(id);

    if (result?.length === 0) {
      return {
        success: true,
        message: "No products found.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Product found successfully.",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to find the product.",
      data: error,
    };
  }
};

const updateProductToDb = async (id: string, data: TProduct) => {
  try {
    const result = await Product.findByIdAndUpdate(id, data, { new: true });

    return {
      success: true,
      message: "Product found and updated successfully.",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update the product.",
      data: error,
    };
  }
};

const deleteAProductFromDb = async (id: string) => {
  try {
    await Product.deleteOne({ _id: id });

    return {
      success: true,
      message: "Product found and deleted successfully.",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete the product.",
      data: error,
    };
  }
};

const findProductsWithSearchTerm = async (searchTerm: string) => {
  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { tags: { $elemMatch: { $regex: searchTerm, $options: "i" } } },
      ],
    });

    if (results?.length === 0) {
      return {
        success: true,
        message: `No products found with search term '${searchTerm}'!`,
        data: null,
      };
    }
    return {
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to find products with search term '${searchTerm}'.`,
      data: error,
    };
  }
};
export default {
  createAProductInDb,
  findAllProductsFromDB,
  findAProductFromDb,
  updateProductToDb,
  deleteAProductFromDb,
  findProductsWithSearchTerm,
};
