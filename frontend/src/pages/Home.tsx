import { BestSeller } from '../components/BestSeller'
import Hero from '../components/Hero'
import { LatestCollections } from '../components/LatestCollections'

const Home = () => {
    return (
        <>
            <Hero />
            <LatestCollections />
            <BestSeller/>
        </>
    )
}

export default Home
