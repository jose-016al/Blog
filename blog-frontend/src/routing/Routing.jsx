import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { Articles } from '../components/pages/Articles';
import { Error } from '../components/pages/Error';
import { Header } from '../components/layout/Header';
import { Nav } from '../components/layout/Nav';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Create } from '../components/pages/Create';
import { Search } from '../components/pages/Search';
import { Article } from '../components/pages/Article';
import { Edit } from '../components/pages/Edit';

export const Routing = () => {
    return (
        <BrowserRouter>
            {/* LAYOUT */}
            <Header />
            <Nav />

            {/* Contenido central y rutas */}
            <section id='content' className='content'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/create-article" element={<Create />} />
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </section>

            <Sidebar />
            <Footer />

        </BrowserRouter>
    )
}
