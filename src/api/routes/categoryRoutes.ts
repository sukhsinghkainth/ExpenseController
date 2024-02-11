// user.routes.ts
import express, { Request, Response } from 'express';
import CategoryService from '../../services/categoryService';
import category, { categoryType } from '../../interfaces/ICategory';
import categoryModel from '../../model/categoryModel';
const router = express.Router();
const createCategory = new CategoryService();

router.post('/createCategory', async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body as category;
        if (!name || !type) {
            return res.status(400).json({ error: 'Name and type are required for creating a category' });
        }
        const newCategory = await createCategory.createCategory({ name, type });
        return res.status(201).json({ name: newCategory.name, type: newCategory.type });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/editCategory/:categoryname', async (req: Request, res: Response) => {
    try {
        const { categoryname } = req.params;
        const { name, type } = req.body as category;

        if (!name && !type) {
            return res.status(400).json({ error: 'Name or type is required for editing a category' });
        }
        if (!(type in categoryType)) {
            return res.status(400).json({ error: 'Invalid category type' });
        }
        const updatedCategory = await createCategory.updateCategory(categoryname, {
            name, type
        });
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteCategory/:categoryName', async (req: Request, res: Response) => {
    try {
        const { categoryName } = req.params;
        if (!categoryName) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        await createCategory.deleteCategory(req,categoryName);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/allcategories", async(req:Request, res: Response)=>{
    try {
        const categories = createCategory.getAllCategories();
      const   categoryRes  = createCategory.transformCategory(await categories);
      res.json(categoryRes);
        
    } catch (error) {
        
    }
})


export default router;