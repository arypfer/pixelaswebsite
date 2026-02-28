import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateProduct: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating product: ${doc.slug}`)
  revalidatePath('/')
  revalidatePath(`/products/${doc.slug}`)
  return doc
}
