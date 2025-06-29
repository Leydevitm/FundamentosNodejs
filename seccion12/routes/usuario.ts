
import { Router, RequestHandler } from 'express';

import { 
  deleteUsuario, 
  getUsuario, 
  getUsuarios, 
  postUsuario, 
  putUsuario 
} from '../controllers/usuarios';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario as RequestHandler);
router.put('/:id', putUsuario as RequestHandler);
router.delete('/:id', deleteUsuario as RequestHandler);


export default router;