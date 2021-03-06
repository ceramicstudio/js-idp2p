import { createTile } from '@ceramicstudio/idx-tools'
import { flags } from '@oclif/command'

import { Command } from '../../command'
import type { CommandFlags } from '../../command'

interface Flags extends CommandFlags {
  schema?: string
}

export default class CreateTile extends Command<Flags, { did: string; contents: unknown }> {
  static description = 'create a new tile stream'

  static flags = {
    ...Command.flags,
    schema: flags.string({
      char: 's',
      description: 'StreamID of the schema validating the contents',
    }),
  }

  static args = [
    { name: 'did', description: 'DID or label', required: true },
    {
      name: 'contents',
      description: 'String-encoded JSON data',
      required: true,
      parse: JSON.parse,
    },
  ]

  async run(): Promise<void> {
    this.spinner.start('Creating stream...')
    try {
      const ceramic = await this.getAuthenticatedCeramic(this.args.did)
      const doc = await createTile(ceramic, this.args.contents, {
        schema: this.flags.schema || undefined,
      })
      this.spinner.succeed(`Stream created with ID: ${doc.id.toString()}`)
    } catch (err) {
      this.spinner.fail((err as Error).message)
    }
  }
}
