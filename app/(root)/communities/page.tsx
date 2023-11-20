import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from '@/constants';
import Image from 'next/image';
import UserCard from '@/components/cards/UserCard';
import { fetchCommunities } from '@/lib/actions/community.actions';
import CommunityCard from '@/components/cards/CommunityCard';
import SearchBar from '@/components/shared/Searchbar';
import Pagination from '@/components/shared/Pagination';

async function Page({
    searchParams,
}: { searchParams: { [key: string]: string | undefined }}) {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect ('/onboarding');

    const result = await fetchCommunities({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25
    })

  return (
    <>
    
        <section>
            <h1 className="head-text mb-10">Communities</h1>

            <div className='mt-5'>
                <SearchBar routeType='communities' />
            </div>

            <div className='mt-14 flex flex-col gap-9'>
                { result.communities.length  === 0 ? (
                    <p className='no-result'>No users</p>
                ) : (
                    <>
                        { result.communities.map((community) => (
                            <CommunityCard 
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>

        <Pagination 
            path="communities"
            pageNumber={searchParams?.page ? +searchParams.page : 1}   
            isNext={result.isNext}     
        />
    </>
  )
}

export default Page