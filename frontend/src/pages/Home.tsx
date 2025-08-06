import { BestSeller } from '../components/BestSeller'
import Hero from '../components/Hero'
import { LatestCollections } from '../components/LatestCollections'
import { NewsLetter } from '../components/NewsLetter'
import { OurPolicy } from '../components/OurPolicy'

const Home = () => {
    return (
        <>
            <Hero />
            <LatestCollections />
            <BestSeller/>
            <OurPolicy/>
            <NewsLetter/>
        </>
    )
}

export default Home
