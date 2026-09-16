'use client'

import { Loader, Upload } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import genericProfilePic from '@/../public/generic-profile-pic.jpg'
import { updateAvatar } from '../_actions/update-avatar'

interface AvatarProfileProps {
    avatarUrl: string | null
    userId: string
}

export function ProfileAvatar({ avatarUrl, userId }: AvatarProfileProps) {
    const [previewImg, setPreviewImg] = useState(avatarUrl)
    const [loading, setIsLoading] = useState(false)

    const { update } = useSession()

    async function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0]

        if (!image) {
            return
        }

        setIsLoading(true)

        try {
            if (
                !['image/jpeg', 'image/png', 'image/jpg'].includes(image.type)
            ) {
                toast.error('Formato de imagem inválido.')
                return
            }

            const fileName = `profile-${userId}`
            const newFile = new File([image], fileName, { type: image.type })
            const urlImage = await uploadImg(newFile)

            if (!urlImage) {
                toast.error('Falha ao alterar imagem.')
                return
            }

            const response = await updateAvatar({ avatarUrl: urlImage })

            if (response.error) {
                toast.error(response.error)
                return
            }

            setPreviewImg(urlImage)
            await update({ image: urlImage })
        } catch (error) {
            console.error(error)
            toast.error('Falha ao alterar imagem.')
        } finally {
            setIsLoading(false)
            e.target.value = ''
        }
    }

    async function uploadImg(image: File): Promise<string | null> {
        try {
            toast('Enviando a imagem...')

            const formData = new FormData()

            formData.append('file', image)
            formData.append('userId', userId)

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/images/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )

            const data = await response.json().catch(() => null)

            if (!response.ok || !data?.secure_url) {
                return null
            }

            toast.success('Imagem alterada com sucesso!')
            return data.secure_url as string
        } catch (error) {
            console.error(error)
            return null
        }
    }

    return (
        <div className="relative w-40 h-40 md:w-48 md:h-48">
            <div className="relative flex items-center justify-center w-full h-full">
                <span className="absolute cursor-pointer z-[2] bg-slate-50/80 rounded-full p-2 shadow-xl">
                    {loading ? (
                        <Loader
                            size={16}
                            color="#131313"
                            className="animate-spin"
                        />
                    ) : (
                        <Upload size={16} color="#131313" />
                    )}
                </span>

                <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    onChange={handleChangeAvatar}
                />
            </div>

            {previewImg ? (
                <Image
                    src={previewImg}
                    alt="Foto de perfil do usuário"
                    fill
                    className="w-full h-48 object-cover rounded-full bg-slate-200"
                    quality={100}
                    priority
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
                />
            ) : (
                <Image
                    src={genericProfilePic}
                    alt="Foto de perfil do usuário"
                    fill
                    className="w-full h-48 object-cover rounded-full bg-slate-200"
                    quality={100}
                    priority
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
                />
            )}
        </div>
    )
}
