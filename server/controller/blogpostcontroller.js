import blogInfo from "../model/blogpostmodel"
class blogcontroller {
    static blogpost = async(req, res) => {
        let {
            title,
            content,
            Userid
           
        } = req.body;
        //const timestamp=new Date(Date.now());
      const data = await blogInfo.create(req.body);
        if(!data){
            return res.status(201).json({
                status: 201,
                message: "blog not created"
            })
            
        }
        return res.status(201).json({
            status: 201,
            message: "blog is successfully created",
            data
        })
    }
    static getAllBlog = async(req, res) => {
        console.log("..........................................")
        const data = await blogInfo.find();
        
        return res.status(200).json({
            status: 200,
            message: "this is all blogs",
            data:data
         })


        }
    static getOneBlog =async (req, res) => {
        const blogid=req.params.id;
         const data = await blogInfo.findById(blogid);
        if(!data){
           return res.status(201).json({
              status: 201,
                message: "we don't have that blog "
            })
            
        }
        return res.status(201).json({
            status: 201,
            message: "you 've got one blog  ",
            data
        })


        
    
               }
               static deleteOneBlog =async (req, res) => {
                const blogid=req.params.id; 
                const dataindex =await blogInfo.findByIdAndDelete(blogid) 
                if(!dataindex){
                    return res.status(404).json({
                        status: 404,
                    message: "we can't delete what we don't have  "
                    })
                }
                return res.status(201).json({
                    status: 201,
                    message: "you have deleted your blog "
                })
                
            }
            static upDate =async (req, res) => {
                const blogid =req.params.id;
               
                let {
                    title,
                    content,
                   
                } = req.body;
        
                
               
                const data = await blogInfo.findByIdAndUpdate(blogid,{
                    title:title,
                    content:content
                });

                if(!data){
                    return res.status(417).json({
                        status: 417,
                        message: "update failed"
                    })
                    
                }
                const dataUpdated=await blogInfo.findById(blogid)
                return res.status(200).json({
                    status: 200,
                    message: "updated ",
                    data:dataUpdated
                })
        
        
                
            
                       

                
                


                
            }


    

}
export default blogcontroller;
