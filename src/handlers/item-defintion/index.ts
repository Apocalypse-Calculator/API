import { Router } from 'express';
import {
  listDefinitions,
  getDefinition,
  listDefinitionUnits,
  getDefinitionUnit,
} from './get';
import { addDefinition, addDefinitionUnit } from './create';
import { deleteDefinition, deleteDefinitionUnit } from './delete';
import { updateDefinition } from './update';

const router = Router();
router.get('/', listDefinitions);
router.post('/', addDefinition);

router.get('/:id', getDefinition);
router.delete('/:id', deleteDefinition);
router.put('/:id', updateDefinition);

router.get('/:id/units', listDefinitionUnits);
router.post('/:id/units', addDefinitionUnit);

router.get('/:id/units/:unitId', getDefinitionUnit);
router.delete('/:id/units/:unitId', deleteDefinitionUnit);

export default router;
