import { Router } from 'express';
import { listDefinitions, getDefinition } from './get';
import { addDefinition } from './create';
import { deleteDefinition } from './delete';
import { updateDefinition } from './update';

const router = Router();
router.get('/', listDefinitions);
router.post('/', addDefinition);

router.get('/:id', getDefinition);
router.delete('/:id', deleteDefinition);
router.put('/:id', updateDefinition);

export default router;
