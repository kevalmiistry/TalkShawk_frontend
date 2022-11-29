import React, { FC } from 'react'
import S from './UserSkeleton.module.scss'

const SkeletonItem: FC = () => {
    return (
        <>
            <div className={S.skele_item}>
                <div className={S.img}></div>
                <div className={S.wrapper}>
                    <p className={S.name}></p>
                    <p className={S.username}></p>
                </div>
            </div>
        </>
    )
}
type TProp = {}
const UserSkeleton: FC<TProp> = () => {
    return (
        <>
            <div className={S.skele_main}>
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
            </div>
        </>
    )
}

export default UserSkeleton
