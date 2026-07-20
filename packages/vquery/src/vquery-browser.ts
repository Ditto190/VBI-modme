import { IndexedDBAdapter } from './adapters'
import { InMemoryQueryAdapter } from './adapters/query-adapter/inMemoryQueryAdapter'
import { VQuery as VQueryCore } from './VQuery'

export class VQuery extends VQueryCore {
  constructor() {
    super(new InMemoryQueryAdapter(), new IndexedDBAdapter())
  }
}
