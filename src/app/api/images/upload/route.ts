import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME as string,
        api_key: process.env.CLOUDINARY_API_KEY as string,
        api_secret: process.env.CLOUDINARY_API_SECRET as string,
    })

    const formData = await request.formData()

    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    if (!userId || userId === '') {
        return NextResponse.json(
            {
                error: 'Acesso negado.',
            },
            {
                status: 401,
            }
        )
    }

    if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
    ) {
        return NextResponse.json(
            {
                error: 'Formato de imagem inválido.',
            },
            {
                status: 400,
            }
        )
    }

    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    tags: [`${userId}`],
                    public_id: file.name,
                },
                function (error, result) {
                    if (error) {
                        reject(error)
                        return
                    }

                    resolve(result)
                }
            )
            .end(buffer)
    })

    return NextResponse.json(result)
}
