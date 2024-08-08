import { Request, Response } from 'express';
export declare const addItemToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeItemFromCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCartItemQuantity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const clearCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cart.controller.d.ts.map