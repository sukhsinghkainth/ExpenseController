import express, { Request, Response } from 'express';
import CategoryService from '../../services/categoryService';
import category, { categoryType } from '../../interfaces/ICategory';
const router = express.Router();
const createCategory = new CategoryService();

router.post('/createCategory', async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body as category;
        if (!name || !type) {
            return res.status(400).json({ error: 'Name and type are required for creating a category' });
        }
        const newCategory = await createCategory.createCategory({ name, type });
        return res.status(201).json({
            newCategory, message: "category created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Error while create category ${(error as Error).message}` });
    }
});

router.put('/editCategory/:categoryname', async (req: Request, res: Response) => {
    try {
        const { categoryname } = req.params;
        const { name, type } = req.body as category;

        if (!name && !type) {
            return res.status(400).json({ error: `You must provide either the name or the type to update` });
        }
        if (!(type in categoryType)) {
            return res.status(400).json({ error: `Invalid category type "${type}" provided.` });
        }
        const updatedCategory = await createCategory.updateCategory(categoryname, {
            name, type
        });
        return res.status(200).json({updatedCategory,
        message : "successfully edit the category"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `${(error as Error).message}` });
    }
});

router.delete('/deleteCategory/:categoryName', async (req: Request, res: Response) => {
    try {
        const { categoryName } = req.params;
        if (!categoryName) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        await createCategory.deleteCategory(req, categoryName);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `${(error as Error).message || "Internal Server Error"}` });
    }
});

router.get("/allcategories/:typeOfCategory?", async (req: Request, res: Response) => {
    try {
        const { typeOfCategory } = req.params;
        const categories = await createCategory.getAllCategories(typeOfCategory as categoryType);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(402).json({ error: `Failed to fetch all categories : ${(error as Error).message}` });
    }
})
// router.get("/all-expense-categories", async(req:Request, res: Response)=>{
//     try {
//         const type = categoryType.expense
//         const categories = createCategory.getAllCategories(type);
//       const   categoryRes  = createCategory.transformCategory(await categories);
//       res.json(categoryRes);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })
// router.get("/all-income-categories", async(req:Request, res: Response)=>{
//     try {
//         const type = categoryType.income
//         const categories = createCategory.getAllCategories(type);
//       const   categoryRes  = createCategory.transformCategory(await categories);
//       res.json(categoryRes);

//     } catch (error) {   console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });

//     }
// })


export default router;