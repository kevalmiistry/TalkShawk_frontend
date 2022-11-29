import { motion } from 'framer-motion'
import React from 'react'
import UserItem from '../UserItem/UserItem'
import S from './SearchUserList.module.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import UserSkeleton from '../UserSkeleton/UserSkeleton'

type TProp = {
    searchResults: UserData[]
    isSearching: boolean
}

const SearchUserList: React.FC<TProp> = ({ searchResults, isSearching }) => {
    const [animationParent] = useAutoAnimate<HTMLUListElement>()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={S.searchuserlist_main}
        >
            <ul ref={animationParent}>
                {!isSearching &&
                    (searchResults.length > 0 ? (
                        searchResults.map((u: UserData) => (
                            <UserItem key={u._id} user={u} />
                        ))
                    ) : (
                        <></>
                    ))}
                {isSearching && <UserSkeleton />}
            </ul>
        </motion.div>
    )
}

export default SearchUserList
