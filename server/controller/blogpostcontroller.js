import blogData from "../model/blogpostmodel"
import Response from '../Helpers/response'
class blogcontroller {
    static blogpost = async(req, res) => {
        let {
            title,
            content,
            UserId
           
        } = req.body;
        //const timestamp=new Date(Date.now());
      const data = await blogData.create(req.body);
        if(!data){
           return Response.errorMessage(res,"blog not created",417)
            
        }
       return Response.successMessage(res,"you have created your blog",data,201)
    }
    static getAllBlog = async(req, res) => {
       
        const data = await blogData.find();
      return  Response.successMessage(res,"this is all blogs",data,201)


        }
    static getOneBlog =async (req, res) => {
        const blogid=req.params.id;
         const data = await blogData.findById(blogid);
        if(!data){
       return Response.errorMessage(res,"we don't have that blog",417)
            
        }
      return  Response.successMessage(res,"you 've got one blog",data,201)


        
    
    }
               static deleteOneBlog =async (req, res) => {
                const blogid=req.params.id; 
                const dataindex =await blogData.findByIdAndDelete(blogid) 
                if(!dataindex){
                    return Response.errorMessage(res,"we don't have that blog",417)
                    
                }
      return  Response.successMessage(res,"you have deleted your blog ",data,201)
                
            }
            static upDate =async (req, res) => {
                const blogid =req.params.id;
               
                let {
                    title,
                    content,
                   
                } = req.body;
        
                
               
                const data = await blogData.findByIdAndUpdate(blogid,{
                    title:title,
                    content:content
                });

                if(!data){

                    return res.status(417).json({
                        status: 417,
                        message: "update failed"
                    })
                    
                }
                const dataUpdated=await blogData.findById(blogid)
                return  Response.successMessage(res," updated",data,201)
        
        
                
            
                       

                
                


                
            }


    

}
export default blogcontroller;
