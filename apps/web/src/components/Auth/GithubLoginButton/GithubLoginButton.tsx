import { FC } from 'react'
import { GithubIcon } from '@components'
import { IGithubLoginButtonProps } from './types'

export const GithubLoginButton: FC<IGithubLoginButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex rounded-sm bg-black items-center justify-center"
    >
      <GithubIcon />
      <span className="px-2 text-white">Login with Github</span>
    </button>
  )
}
