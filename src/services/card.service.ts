export interface FormData {
  title: string
  description: string
  category: string
  startDate: Date | undefined
  endDate: Date | undefined
}

export const updateCard = async ({
  cardId,
  data,
}: {
  cardId: string
  data: FormData
}) => {
  const response = await fetch(`/cards/${cardId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update card')
  }

  return response.json()
}
