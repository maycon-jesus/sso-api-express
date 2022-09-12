import { BootManager } from './modules/Boot'
import './types/express'

const bootManager = new BootManager()
bootManager.boot()
