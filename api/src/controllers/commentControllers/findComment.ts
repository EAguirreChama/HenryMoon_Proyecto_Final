import Comment from '../../models/Comment'

const findComment = async (Game:any) => {

  const comments = await Comment.find(Game)
  
    return {comments:
     comments}
}

export default findComment