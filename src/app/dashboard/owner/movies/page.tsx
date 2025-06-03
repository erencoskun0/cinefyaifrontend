"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Clock,
  Calendar,
  Users,
  Upload,
  X,
  Save,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { MovieForm } from "@/types/cinema";

interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  rating: number;
  director: string;
  cast: string[];
  poster: string;
  trailer?: string;
  releaseDate: string;
  isActive: boolean;
  sessionsCount: number;
  totalTicketsSold: number;
}

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const [formData, setFormData] = useState<MovieForm>({
    title: "",
    description: "",
    genre: "",
    duration: 0,
    rating: 0,
    director: "",
    cast: [],
    poster: null,
    trailer: "",
    releaseDate: "",
  });

  const [movies] = useState<Movie[]>([
    {
      id: "1",
      title: "Avatar: The Way of Water",
      description: "Jake Sully ve Neytiri'nin Pandora'daki yeni maceraları.",
      genre: "Bilim Kurgu",
      duration: 192,
      rating: 4.8,
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
      poster: "https://m.media-amazon.com/images/S/pv-target-images/f0535dd61f56bddd6ee7f3bfb765645e45d78f373418ae37ee5103cf6eebbff0.jpg",
      trailer: "https://www.youtube.com/watch?v=example",
      releaseDate: "2024-12-16",
      isActive: true,
      sessionsCount: 12,
      totalTicketsSold: 2847,
    },
    {
      id: "2",
      title: "Spider-Man: No Way Home",
      description: "Peter Parker'ın çoklu evren maceraları.",
      genre: "Aksiyon",
      duration: 148,
      rating: 4.9,
      director: "Jon Watts",
      cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
      poster: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGRoYGRgYGRgdHRcdGh0XHRgdFhgaHyggGx8lGxobITEhJSorLi4uHR8zODMtNygtLi0BCgoKDg0OGxAQGy0lHyYtLy8tLS8tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABBEAACAQIEAwYDBgQFAwQDAAABAhEDIQAEEjEFQVEGEyJhcYEykaFCUrHB0fAUI2LhB3KCsvEzkqIVFmPCQ1Rz/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQUABv/EADMRAAEEAQMDAgMHAwUAAAAAAAEAAgMRIQQSMSJBUWGRBROBMnGhscHR8BRC4SNiguLx/9oADAMBAAIRAxEAPwDkNZ6ZI+IACLAEW5i433jqd8MOynDxVrrHiC+MyIHhveCf3GEjYvP+HuVYU61UDlpBPlLt7Qo+eKIsutKlw1JOL13qV6jPGrVBAMgabQPl7mTjRMQpJubzc/icEIuCPK0YCNyt8Nskw2Pp88K8p+NsNcmLgG3X2n8se4TQLCMTILVChxKgtziwCkxHl+OGXCuJ1MorpRbQjHVAAN4A8JIJFgPPELVfGq0/h06fWdz77emAuPMacKRfmf0xPJH8zlVANjHC1OYLVdRMsZMkySYO5O+FlcnWQev588S8ObU3oCcRZoQ7HnJ9/TFUMOwKGWXc5MuHMZHtb3gDoevvzw3oOzHnb3+f3v774r+TmVub3G/098WXhuVqFxY7RI+QN/U/s46jMNXMnIvKKo07iY2O5nruZ2n9nDLLJyMWG21oPPnF/wBxiIZRy+nSZBAAA3m+3X/nDVlpZddVZ4MfCIm3vA+eAmlaBkrl/KkkNNC0pUJ5fQYa5fKxdiF9fyGK0e1obUKKhAJltzbe5t8sedmc89es7sTFNGe+5MqBPpq1eqjEb5C7hWQ/DsjeVYeL8WSipQeIkeKbb8gPY4pGZ7Qm4WlSjn/Lp39ZHp8sT9oKupmloiOu0xy8yPnhLSRDr3aEYkm20bAT13n2wtzg00vsdH8MiEV0jctxGg5/mUkE3JQaD5/DY+4xNmODrZ6ZOk3VoAKneD8/P8QKvVIvE3xc+yr60dTtoLD1W494ke5wWHttR67TCF3SqnnOzNSdVJQeqghYPVAxAg9JtytAHUv8NOIOaH8PWVlqJ8OoEa0tsftFTYxy04rL1NLXt0w24Zxdl+E/vzwL7Ipc7d3Vl43kXYMwM+UDbnFsVushHpPXnAO02n9zh/luNs1tN8Ls1kGmQCB5zPofaP3GCicQKK5c+naH7wCqX2xqV6FIOtOEf4ah6BtJVbkgz15XFrio8P4a9VkqVPhJBCMAdS+YPIi3mPY46XxnMs9FKFREZaTMVlZN0qIZkxMVDy3jpiusuqopJ9fKDMXxjGPe7r4XQEsbI+hL8x4XtaIAA5AAbeWCcuZNrq0EjzAP5E/PEHEkhj7H15H8ME8EplwVi+84okCs077FLXM5bTrjbUI9IaPngbOU1ax+EypjcDlE2kbibXIPhZgWofxMr3WIHlpBC/jgCqlyB6DCN4OHI5IyMhKcpmQ9I5FyTUo6mouQwKiGLZZp6sAyyYBJE3wkrDFx4HlE/inLhgrUJLKB4XRlJJkgH+WCSLkwYvBFWzNKJB3Fj6ix+uBocBIs3lK6i49zxNQNVUaGWzAE3XZWk35AE9YO7HEtRca5WqEqKW+DZ/8AK1m+hn2GF1aK0jUmdzMyL8+vrhzxDOtWQo4C1KUG32hcN9SCALQegGBeJ5VaNV0ZS0G14tuDt0wfw3iaswVqagufG43IGnSoHIAKfMkjpgWCiWkrTnKTjbzx5iSrS0llN9JKz1gxiPAUipbvlGH3f+9P1xfsjXGW4ZUpkOWqiqqkAQdQSmzSDYLBF4kuAJuRzrTcY6vWpH/0MQLwh/0iqjH/AGzhsZFFLfyFRFoEGDA9wQOu2CSBsBYf8SfXA4wRRXBhaETl1vi0U6KutNhZjKN5yIB9b/TCPKUPLFl4dlDHnv8AK5xhVUTTVKTK0hCnG3bCmB3eoXZCJ8wefsRh1w3h+rTb54X9rnD1EBUkUvCOWprFpPJQCon2G5IGMgvACZqXbWG1U8nS0yI3Fz0Hn9TiGqgd7Db6Ynz7Gfi2vJ+0T5D/AIAjGmRQloAJJ6b746DQFxyf7k7yVJKdM1nEhRYfea0XkQBb5jriLIMcxWqM+ookgCTpEllUACAPDq3nEPaKvGXSktmA1zM6lkzfaQ3Xkvlafs9VINTS8A1G5sCVhdIkD8+eMe/sFTooQ7qKm/jamXeMu7Cd0JJBBFlTYeZiDt0OIuPTVRK1NpHwOBJ0sRsCd1YAkGOR8p14gGapb4zzHKT5bE/P11YeZHhGijVDTqIBIuAul6ZFutz6SR1OFkA88otU0Ru6VT8mpUEfe3+mLx2Ly8Uq7mR8C+xJk/MDFcOThgouWMCMXTgpCrWRfh7ogf6SJ+mrHnCm4UjH9YVBTigqMHIgOsMPu6hf5GG9sR0KhU1AfuOvuf8AjFl4Z2JXM8PoZjLEiuqlKtMnw1Hpko8T8DErO4U/0zqxR8xmDJB1BllHUgypFiGB2PLHPkd1WvrNDqw9ny+DSzvDcnmYH4n9PfF37AozG4GlpCn72mRU9hqA+flisdk+zlTiFbu1YpSQjvav3ZvpTq5HsBc8ger18rSo1qOWooEp0aTrJI/oc3mZspJO+oeeGxPoUub8Q1AkdQ7cqt8RyY0kz/bCzs1RZ6pWbH6AXP0xYs5QPiBgjbcG3Kfx+XTAvZ2iKbVi42pPHvF/liw4aSvnmvsgIHiedfU1FCdNwOrm5Q7c20mPOOQhJlWYVA9/BNSR/wDGC8/+OGWYdlqMykB0a7HZQCL+fIE3kERM4XtUCmoEfTAC0y20swKAmTBamHE7XvAk4UTtXXjijLbKf9ms8a6VKVUguoHdOBGuFYupjaFURtuBzGFtRFRr2n92xt2UgVqdp0VFLKvNy9MWN4AAiNm7liItjTjhGu02J3N7Ei/nh2ndkhc3VxtD+ngofOrqItt+GHHZlJWqVGwUT6zP+3CHJ1SbTymeh5/vp6Ys/ZhwC6xapH+lhMD0I1QfI9MHqPsEhM0jqeAUtzdKxPPG+QWipPfEqHJTWLmmIjVp59D5ScMuIZOJthPnKB5+vzvjlTN+Y3C7PGQo+2/Bctw9KVfUK71NQRmDBVAWQf5ZOoSRAPhOo6rWNWztdajsZDB2LBgpWdRJ1BWMqLzpJ2thnmlgR6x7xMeukfIYR5rHoA5opRTNygXokmBHzH54FqUGKlosN/374LOB65MRy3w8hKvK841RL5ahmOd6L+qfCT6rhPlQSRp3HiH+kavyxaOG5bvMpnFknu9NTRPhMW1RvMT/ANoxXcvnNJGlFBHPxE+0n1wt/IK1ncLfOVNemp98SY6glT+E++BsMOId0VpNRUqsFSCZJZdOok+eoGOQgcsARgTyiWgEsANyQMdTpZ9TwsU3nWab00QC5qN3gUAczdTHIGeYxzQZ9wQV0qbXVVBt5xOOldhguayyrVeBQ7wKbSverBI87HDYaohLlxRSLjfCFpKj0tRU2aSDBtBtyN/pgTKrcYJy9V6X8muNpWOUbg+l/b1BGGGWytAam1ki2lQCPPxTM2EHa5wyghYSMFFcHpEtAEzi75XKIig1GCTIWefXblGFnZimqkELvYDG3GGapVcmwSwXpBj8cLrcSBhdO/lsFo/NcUo0AStQOwB0jz5SDyFj+GKJmc4xZiSSWJJJPMm9vWTbzxJVAd/CDHz94wRWyioJIliNukWudl5evlvhsMQabUmpl3UEqoZVnlmMDmeQ5xO04lXNANFOAvWLkevT92wNmswz2MAAkgDYT0/U3/DEFJ73xSHUpC2xldUzvAaeayOWZVmrTpnSAY1zrDI085JibSSJAY4ofDqhRVKrqLuFRV3diAAvr4SDO0Gdjh1R43XXJlaTwqyG6qGvKtuJuvrogiThJw1R3arpmWDGPskXBWLgqY22jE+wglV6YuIwuodm+EpRIqOFasee4SeSnmeWrfpAwN2kYrSqwSC72i3/AORn/wBsYrtLtFmlGjUpJt3kS6g81+yWvYkHlM74b8VqjSighhpIHMyR4Te9gQZN8aGHcCotRvb9vlJMjl2LBmZvK97+e4xaOHUkF2MTI09QwIM+xIwny1KBffDHJpNhh7xYUQeWm1SF47m+HVqq5dkh2JenVVmUuLFhBDA2vf8AAQtzWfFV6uYzJVqtQrJVdIsIsByAAEmTtfeXP+IHD9NUVAwOpQbcrsD8yu/kcUjOY5c+HYX2Hw9sewS1lWLgXH85lFanlaqCkxLBWphihO5Qm5JtZp2xcuzmerVqbPWbUxULOkA73MgTJIM+WnHOsgmqBfl6nHU+ziq1EsIkkAx1Agx5Eg35kNiiDauZ8RYGNc5o5QrFkPhPtyPqMMuDZoFyWQagpgj1HL9740zGX3xpw+mdQ9fpi14Dmr55hIKzi/C0zKrmKOlKgHiD2UlRDLU6GJBPQ+eKjmkd1phWSmKzAKXK6VKSFNMi0w0IViZBkbF1xakQXBJC1TLJMAsYOl/KCb7cjIBOE2ad2bu2TUum6siqp06mbvKm+kksW6yecYSG9NhdSPcBzjsrlw7h1LI0KNCms1C3eMx3hVZfF90FDUjZbNil1c6rSH06ddSCB8ILuVE9II9OhGG/DzUSjUq94zlV7um7teAAA5JFyzKqesg/AMUjJudBEQNTRaxFtuomR7HA6fDiShkbdApnVoMkEGRyPX05YnyucYMGBgggi+xG1v1wDlcwV8NoNyDsfzHqMNEywYFhYgbevQ/aG9/+cVOyEDelwKtlHiNKrBLhSYkdDzgDl540zOWVllCG2HoYgb8rYp9M6HvIm3pizcGcrUAiQ9iOp/5/DEJhrIXWZNarfFEMwREYr+aW+L92hpqSTG1oxVc1l6cg6o6j9Pyx5owl6iwUDw/hQdGZyRyWI3g387x9cJcyhSzCG6dPXDjNZ2BbbaMI65JJJPqcedhSNBuynXYTLCpUzFKbvRI9ZIQ/LvB9cUg74uPYerUGdXugCWRlIP3fCSR5qVDxz0kc8IOLZammYqIWIhmFlkSLW8QO98JdlqY3DkPTANIjmjao8nAU/VVxFgl6J0B1MoQEJ28WotAG+y74GwBwmKHFt7BZ4CoaT6glUESszqAOnT/VJt5xituii5BI8rfM39MbUM86kaDpg6hFr+u59+mDjf8ALdaF7N7aVvz3C6hoPUWnp/hXajWUfEFJYhyN9Iqd4C/PUOSziPhjTg7szxU6jUQ1C1Se80E6jHjYgX1EaZ0kENdSCCRgzgfDlzKGplgO8VQamXBBIAga6J+2p30i6kwJEYebBtLYeys/ZOhNRTuFk+sCw9zj3iwJNUmBqYAm9h4icEdnCFC1GMaWhlNjI5Ebz5YL7SZUPLgyrGRH1n8ffAsPUqpekAFVDKUQrT0EnygEn8MBZ3MEq29+X6+eHuYpoqVDEDu23n7xWPeF+eKxVqgzpnnvv1v5zigOpSOG42ldU3xGGviUiLew/LBPD+EPVlgLCNR5CdW5NgPDueo64EHK00AnHZmoGbu3+B1ZW67agR5hlB9sbVMuUNRTqIQkTBg6b25REnG3CKFNHXx66kwoSYF4ksYm8gAAjffYx9rs0j11CNqGgGes2iRuBpkeuGOK9pi5rz4XuScuRETyG8Ha55m8eXli3ZOkxpwY1XMxEk3M+835WHpX+zPDmdhpHvy3j6k7c9hJMYtGb4plst4WJZhyWLdQSLeyz5wcC6RrcFMmYJhShy2VdmgiI3wdXzlDLqRVeCSPAt6jeQQXFyLmBivZ7tcK/wDKo0KwBt4KoQn0PdswnpgOrwvK0lJqq6sRLUxXVjHPvWFMEAzEW84MYRJqLCCD4W4u6/ZQdueJBzQqABScvT1ICGC69TkahYkczf4sc+zlb0IOOrcX7N18w66qNKmgEBVY3AsJcr0UcgAI8sVPP9iGWqqVKgQMrOIBYgKFJAkAzDDadj0OOc+Qk+i+hihDIg1pF/ekOR4oEGx5iekiLfr/AM4Z5TtTVRE7okMrlj0KwAAR0kbcsNanYWCdL2Em4naJPxbXHnhLnuGrTcozExF1UCZANpN/XY7gkYayQtSJIxIK5XS+znaCnm1iNNQAym8/5f3ywxSgZB8/7Y4/SFFTKvXDC4IRN+Vw4IvzxeuBdsGWnpqFqgGzOqo/lqYEqYjc3nc4sbqMLiT/AAwtNtTjtBTAc+gsRuIFj5jkfKJECafWFPvFJDRN78ucws/Ig4tTcUo5poVtFSLI9iTH2GWVM8gCd8I+J8OIkk7crk/KwnykYqhc2qSw2RmCEwqmnUokFwqApDtZFLBgBYWNiIiF1E/eit53hdSn4WJKqSqggArBJZSBzk6pkg6rHEbm5C6gtwNZOxgwoVYRg0EGDcAza52W4kaaqjtSqIfvs6Ot/sHQw0xyvM/ZMnCw3Zxwte0nI5SUKQb4bZTNEAb23/ExhtnOFUmTWtRNJkzMC0SSzWUeZOFmZyjU2GsEXBHnsQR1HnhgeOxS6J5CmzFAFvr84j6HFg4QDqpkXIkeo/ZwBSoghbfYT/aow/4FQCAMfhG/va2FvOCqY3AUlHaSjDN0Nx77j2Mj2xSOItvjoPaAAqXncnFE4hTE4S04T5RVJDXfrgKqZwbmUg4Cq4BxSgnn+HlOc/TMxoWo3rK6I8ruD7Yr3atIzmYH/wAr/wC44fdhcwaeakLq1J3f+XW9MKT5aoBPKZwk7RZZ2zFRwpbU7ExfT4mENpnaN9sCW9FoQetLKQ3x6RjymTcfvnj04WmJlURWEiAdiv5jy2t64W16BQ7W64MpvGGFIAiDzwZaHIbLUBwPiD0ai1EbSUIIN+V7RzxaeHcf7uutfLAUnKjvOlRogkrsJuTEXZtpxXa3BXa9Mho+xYH/AE8ifLfC5HZTBkEWINiPUcsBuLcFHtDuF0/iPbFg1J6iVK1I+HxFQaZptMJVVJeVdQQ0GFWT9o2nh3HsvXowlGsVYTvRYoRY+DWGt5aschyPGXVCC0pM6fO1425C4vYYnylZKtZNe0ifRennynfDYyCQB3S3sIG49ldM9x7KnUne1BBgk0h4rl7AtO5UXAPg8zhSlHLE+HMErAJJ7qmJvzeqW/8AA4F4p2irUapp5enT7pQukgDoJ5jnIwP/AO7s5BlEgC8LMDqYNvXBulYwkG/b/KBkWoeLaG0f93/X9Uw0UEcghYFv5jliCCdUwtNeloYWMzhxxLOUno0dGYpwtUO1PUiiBeAloMg+sqeWEXZLiZb+JqtGpizDoIDt8pwPS7Y5orq7tAOuho+c+eN+e1rGl2LzgX3I8+i3+llfM5sYBDTVl1XgHA2nypu8FKnpQzZqRqA3Yg6lZW5KWLAxyB6iY8impixIJmTsImfYWBgWwZR4uMxl6hq01WoqsbCJCgsp67iPn1xrnK4/h6KgxpmfPw1D+MY1xdW8ZFA+5pFG84Y5tHcWnN8N3WPN48K1ZvjdGhS7qjVRjB1Ori9oOkjYsTpB3VJIuxmu0KhqmDpcHeAvh9HF1gciY8sa9oe1L0aiLTVCrJq8Q56mU89vDiPhnaYVqgStTS4JV1BBBA9+U/3wmRrfmGPdm64xfuqNNNqGwCb5ILavDuqueNoz9UwGbFEaabKNVi5MEzyBPwrE7ec9MLsxUVvAGWCbkkeI9T5dOl+pwyyFZErSDuu3STH5N7RhP/7uzmogUVIBIBjcAkTGrChpenrJBsjjxzyQq3fFJBKWwMaRTTbiR9rPZpTWtx/MQVGbqMtgbpf2084+WIqnFqkqxrayAbkp9qJuoB2C/IdMLsxxqtWKLUpgANqkDoDzBOGXF+1D06oRACpQNOgtBLMLwfIY0aIWbdgV4736128rH/Epxsa2Ju4h15NCiBzts3fhSf8ArlUgRUBN7Azzm9+f5eWIK+YNTxNc7H8vz+WIKHas1KiU3pq6OwU+A8wbgkkSCBiSrVUOwBhSpuTt92T66QSeuE6jT7G7musXR473XBI7KnR6xxmMUsYaaJBBsUKsZA8haR7fvyx73q8gD5kn8AYjyM4hy9QSLiN/0/8AKMHcYzCMQ6xzU+q7fT6AY2GB743SDt/D7Jmo1zItTHARYfefHj3QWYWPELLv/ljcT5EiPIjFn4TxD+Jpmm//AFlEg86gXcHqwFwdzEdMJeE5xaZ1MbGAPUmB8yY9saZDN91mdSWAcFfKCCB+AxVG17YhKeCf570VBPKyXUP0wH2RYPk9x9LCOzaxYkwY9uYtPL9RhRWZQdLXAvAIlZ5qI2PTY/Iiz9oaCo5t4QzC8/DIIjSRchwB7YT5zO06itTTSalEKwkKR4pkQQRBsL7Er0xSWl+R/wCk9lK/VCINaWk3zXYD+7+evhLf4pqZ8KosQSANSuIlSS0lgVIIuLGRGGnCeMF6qUKpZ6dSNKnxPQY2imo2EQdAADKRADfDXs1x1CSvdJKppViG8QlmPgLaFPikWPToMWHNZ2mdC6tFQjwOORZQxHmGB2/OMKit7yw9hf4gfqg1Ja1jXtaTbqNfcTdd+FZu60M4YgBSfQLqDG/l4vWV6YbZWtRqroy9WnUZLOqGSpNr9Lg7+eKBx3i3eZRtJKvTWmtRfRlWQeatvPqDeRhllOIN/FVdBK66S6o/pZiP9+DcHbizwAfxpK2jY1/Nkj2F/imvFhpUobkmT+gxVMygM4PzufIBkzhI9eTvvjA2kUr95wlebTC2pTJw/r6YII359PTAS5c1HWlSjWxtJgAAElnY7BQCSeQGAcO6Frk57DU0prWqMRrZAy+So1STPmyD5DrjntaoTUZpvJOOg8UQUaeZp0qgfxplkLQGOkDvG9GZSbbyMc6m99/3vgZ+loaF6HqcSie8kCx1RBJJMxtvsAOWI4ONysY1jCE4ikSmGWUVmmFmBJjphcMEI2GNKEi00o1OhwZWZKoArU0qRYMZDgdBUWGI8mkYWZd8MaInDtu5KOELW7NK3/RqBb2WoDt//RRc+qjAGc4RXoFWYKBNiHSCR0vPzGLXkaWo9DgPthk3ITwFlXkJkEgXge+AkiDW7gmwSl0gaT7pJVzlQbaT6lP1xpl8/ULCQoaRo0kE6uUR5x88BnJN/wDr1Pk9/pgvh9OqjAplWLg7sHt7mAPXAx6h7XA7nH0PH1yfyV0sTH9mt+79MI6jVC1cwqQF05grGwAFZRHlEfTHlPjjKndjMQgM6dKxNoMaPIfIYGXJ1aDGm1MsTTKF1DEQ9zEWsSRi6ZPshlGn+SD0GpxsRPOwicawyHAA6RWR6kpMjomtBOdxvB4wAqhXzYNMpSYPUqRTP9KQSdIjaBE8gT54lbM6qJM2Uv8ARVn/AHYsFLg6UEqd2qg6HGrmZ0kSeXhYW23xVsrTdkdBQaAHaIckl+7VhtyUT7HASalwsO7192DaZHEHZGAP1C94p/N7plIP8uD4lsddQwQT0Ix7k813aaTpLah3YBBYFgQ20xyjz94XVcqFMNl6gPmXH4jDPhNBCrKlGomYYqlNj8K6jDMzMJFvujnhZlY+UyZ5vNAefJTBE5jQ2xwBiz6eEQ/EQlQTsr06ZM2mGZ79ASRgU8QqglQiFQTB1rcTb7WPeI5EUkSkaZqDckEjxCZmPXASUaZ3y7j3qfph0OpMn9xBsnFDn/kFjoA3gCqHOeOOxTvh1Vn7zUoULTZrEeIiNK2J6s3+nG+SzlRlHdsbqNhM+OsDNj+56nAuRo0lB06lm7StQ2AbqP6jgjKZSkQQuuFUKsF1uXLNNwTYn54OV3yw50gtttPLTwD6nysa3e5oZzRHBAyR6DwtcznHpiGbwgjUAo8MyASIB5kW9MQVq1YQyqCDIGzDT4SD0uQTjTPcP7v+bSk/ZdCSQ6nfe/78sR5DMRFMIVWSbljHWJ6nEc2rEkYbGKo3ih713Cpi0xZIXvN4rJv2vsfCnXNsEJcQWZUECLXbYeYHzwLl80f56kzB71fQwG+Xh+Rxvn81qZVFInQZUydyFubX2/HEdKiEqIzfCDD2nwGzeHnblgodUWNaB5JPrePy/NJnia9+4+AMdq/zlQcSzxKeAnwxB5+EAk/91/8AVhxSzo77oDocejQf/so9sLMrRDL8MLyFzbqT5n8BiOnWKlf5RYoNE+KGAJiREHf8ME/U3bQOmgB9OP191kUO1268g3993f8APRXTtvxsGqtJTtTps/QEIov8iT/pxU6OYVahqhqYcyCdT3B3BBaIwx4FwZs89dmBpwATvLSQAEBGy2J6ADkMC8R4JSDELqiTEnlJifbDmSvfGA0Ch58/zhJkZG15JJs+PCB4ggJvuy61I2IMm3uCfUNibi9VmFLSfF3dJx7Ii8/8pwJVrMqrSZC3dsSrXsDBiRy5x1wRlq5qOk04CrpkTZZYixgG5jAOnJkLiKJFH8P2Rs07dm1p7gjzwf3RgrjMUtSfGBDqN77x1BjbnbnEn9m+I95mfWiVPqopgn5gnE78E71g2TQrVCBhG1S8MjfZVvErR01SbSF2QWp3xrik1JlkNbc7EFailfUEX8pnFInN7SLNVfpYPtj6fckSRtdESDRHI9aIse+U6zFUkkfs4XVKkzyw0zvHKKjUaAqMwjTD0iptqOqnUKFbgAaQbjEvD89kyveVqNKmTdAxzNVtPw+KmGVDLBjJaIjwnfBudfZQNaWjKS8PyNbMVO6or3j842UXu7GyixuenPD1+FHK5illKZR8yy99Xrb06arLBacg6QjKKmsgFnWmLAacaVeL5ipUZilGllaIJp0xTRFJIK02KX1NDEwfCJMjrWc92iZO+UMT3xBqNPiMbkNvJt8hhW2up3CZZOGhK+0me1vCmw39ef6YBoMzL4oIGxO/pPMesxyx42WLHwjwzOqeX6/nidgAIGwxO5xe8uKe1oa0NCiY41AxuRjTGLSLRAOJEOI1GJUGCCxGZeDhxkEvc2GFeQp6jce+Lbw/hqnSQY62mfScVxjClmdtR3DeFahqVj8v7jDmlw1vtHV0MRHWd5xImYVBJ2xEOK8wZk8rxcCPMxODDyeFzx8x5RL8PBUCLiYI6H8cSDLSPHtG5Nxvaefvj1eKiLr4iRA9QMYssxEy1429IH7j81mTCsibJwUHUytMzpm3STHuMT5TLEMDyxPVysKNNv3t6H6Y8ytSDiR+pPCsbp7yq/xHL/Fvdo+iz+WN+B0/FJGwY/8AdY/+JOGfEMvaerN9Qv6Y1y1MCmT1t7D9nHK1E668TOlVvO0C9Qk/vrg6jwV++ClYemQWkiygTflYR8xzw24dkxJdgCq+Ig8z9ke7QD5T0w+z+TPfVnNg2lyY+yoWLf1ORHmnTCorLS5ZK8A0FSs1w8T+94E/XG9XgxC023NQEhQDNmK+8kHD7OZQKVG8qGIIAKzyIBImBO+xGGuVy+mtl5HwqoA821MT6DX84HWJ2BznEFPMwa0EeqpVDhYKuxsqDfqTIAHnufQHAjZEdP374t/8Mop6NSgqRIY7s3xGBdggAWBzLHbeepk8u76UFi4Fgw8KqJIYyAC2pibkBRY43YexXv6oAmwqLU4VYHrP0/vONstwZTSq1HBa2imBu1VtvUKssf8ASOeLTm6INQlQFXZQYhRynVPLc+uJqyKzohc9xTBMaiO8i5tzLtAA5COmPRPzkr00ttoBIKHZhhRRSgDt/Md3sKaG1NPVviNpug64U5zspVSoE06yy6lKEMGW8sCOQg4u3DOJNSes7CWq/EQAeseEkSADa9oFjhu9epUPfNCqaeiBY6QZixIXUSBYmw3xY2WPbg5UJ3h2VytuzOYRWLUnCrBYkRAMRv6j5jE9Tgj0p7wKrKQNOtCw9UViw9xjoFUuV1FA5DUyZMArSMrTACwFmDbptzwozYNUEsTBYsxLkjqbQBJJ3jDCQMWvNcT2Vc4W3d1VMDSfC1zs1j9MAcayelo53B9j+eH2Z0hgVFhy6jpiXi3Cw1VCvw1AGU/j7jp1w/STgEttenZw5KuxfB0d6lSss0gjIQbAmqCsSf6NfzGBqHZ3QXC1VqICYbSzGB98IpvFzaBfBHaXbukP8tbAA2Y8z8+fM4rTa0jSSmmSItB6zi/eO6jDXh24FWjL5Jl0VaNRXNEl4psjEwTrCIWXdJmYuBviPt1RqpXNalIpVRrAvALHxgg7Q8+2m2ENHPrW/l5qakCKdRf+ohiBcDxj/N88E0eJZrLqadcHMZaTEg2nmD9g411EWFhsusoOhxAEgPTQ33YCxje/tgXO8QLNJi0DqIFgBFoAw+y/ZWpmR3mWZDT3lmgrzhgAb+YsfLYQ5vsLXUy1SmF6jUx+WkfjgAZDgIXSQA0TlVrMcRZk0km20E/X8cDZPhjVQahOiiDBqsLT91B9t/6R6mBfDzMcLp0TsXbkzxA9KYsf9RYeWAc7WZzLkkjaTt5KNlHkLY0xOP20Qc2uhB1dAtTBCDafiPm3KfSwxAwxK+ImwBwtC0xowxvjXC1qITE4GBKr7RywanLGtcj2IzJxaTGLVw7M6QOeKfriL3mcM1zM2UwPxw4SgBJkh3K21s4rrpJ+WNcm6qdW5ERtuCvz32wmokgSPoQcTI284WZlselrCsv8RqIYCBqvGwnRaIthwkGohAPX8J5W2xTMo3ilTsfp+eLvwrLsV7zeZEcwJkwQLibe3thIlu1W6INFoipJ3wNog+uDim45fhgbNC+0W26+eIpnJkTbUOeXwJ5yfqcZkqHeKQNwJAHMc7fv64l4isaV6Af3xtkvAJBg8j0xzJXgyUqw0iPChG2mBEzbmYgT6X+Zwyov3jMzSDpAsSIA0ixEHYT88D16VwY+IT+IP1E++CclSOoWkc/Mc8B89wO20t7WltoZ+HEXgx1j8cFnJuxlgzN94W9BbaPKIxuqFWI1aYO+23lid6AYSDLekT8rTgGOBvn7rQOJwg6nD9FiLYB4y5oUyRYmV2Btabfvpzw9yistjcdDhf22zVJaWwZhuOYHP54YwMy8YPgrzCS8NOQgOEOawcEXViOkiTvGDV4bJ2sMedjeIUKlOVIBNxMSQZ/fnOHVaiTMYa2NpbuPPhZM4h5HCTrwsz8JA5k4PfLlliIAvgujSCDfxekxgYqSTLapwADWSB36hKLi7CXtSBtgLN5IKm1tX4YdGiAbg4i4pREBbiBPqSBiguthK1uCAqbmctF8S8OaoadSmtz8VMWHiG4BPMj6gYZ16WqPDAFrTecA5umVKupII28umBY7YbBVe3f0qm5hIEAybEnrz38jgHJcNqVHCosyeeL5RyCVHqMUBZ11AWsfEH0yCJ1Q21gSBgPhWRNKsrBSACdU3gibDHVbLi1N8vkIrIdkSqaqjKIuQIge9p/HDjIZrJAdw1VZP2CCCfQMBPqME5qslVQC7L/lJB+YuMA5TsvRRqh1s7OhF2ZmUMpUkSbSJPK84oZJalkYqRwGrTo5yotNz3DVCacSJUmVEctx6gW5TbOM1ZQgEiL7xt541zPZ9KZVkuQ7Uxqm5kaWLHfYEesYziY0xItz/fPF+nAXH1lOkBVB4rSub2wjzFPFq4rRXdZ+UYr2ZXByhVxHCUuuICMG1lwM4xE9UNUDDGuJSMeYWiXgAxNVjUdBYrynf3i2+IVwRTqsupQbMINt+fPzwgOVWxS90RDEMAZ0zNx5GL+2D+HGSBE+JR8yZwEru4AJYhbAXIWeQ5CYxMDGxgjGl4XhHae8NrkFYsW7iNoIZ2DaieUCMMjmz3JJVVYLTaQokFnrBvJTCi4jbFVo1GgQxtHtpMj5E4LGZMaZMQBHWCxHoPEbeZwpzwVQyOk+yHEySASp89K/pjoGQz38tIt4dhEeflvjk2WJBkYuHBs/KaTyP4zgWuAtbLGXUrjWzAME2PMjn8ziLL5lSwEtHSxB68xhMc9OJssLg6he99+eOfqJKKYyHGVYKopO24nmfEPkSY9iPfEdbKMnodiML0Im5+WH3C3JQqPEIMAiY6Wi3tiEOEry2qPlA8GIWDYQ60SafXSfod/qB9ca01OD6JUHVOk8139R1+eN2q0Zkaj7Yx0QIB3AfX8UkSnIpR1KJKq5t1Ppt7xjKETAk/TE9B1knXIPIg/u3liWplgsOPg3N7CL79MMMO6ntr1/dK31gpb2jqE0mCGGVS58wIBxyKuj5qui1XC05nxTB/pAF77e+Ot5qiXYlSIeBfbuyJbzvO2KG/ZdP4iUIIBupJJsdtI3HmBEdNsMbIA6zyqtOQBSS9kKRoVKauWUMoLgDawgmepk/u/ZOFuihVUt4l1jVFhsPTfHPafBlVtTtPMCTLe/n97bpOLplqLUqgZ2HgkWFu7IJA9iCPljWS9e6lmqogC00emJvIwK9OPTqMFtURrnbkRjZMkCfCTp62g4F0Rkd0Ufz9lGHbeVBSoeK4tv/wA4gzVyZwfW0xGoKOYF598Dk05+I4e4ADZY91rXWbpKmomG6fS5/GJwFnKJcAAbYsGZKdTpHKPrgHOEhLAJM3NrW54EgBpzhPZIeyAfICKZDXXWpg7aoiI22PvhT3q0p1sbn2PW/rhvw0xqEg/2v0wBVpKSZExOKGSgsBCY1tONrQ1qZgq0joLx6RviLPVgwAbLU256qhqGyyfGKaGLTzIE+uEzUCtUlWamLgRytYxzveOeJaPEsyZpVR8QZARGlpBsT/UJg2gxO8i2F2UM0eMJ9w51enWUD4KxYEALAeSIAJtKiN7EYDztSRBuef8AxgrhlB6feB0FMtTpEgySdBZBctAmFNuu03wv4jNyRjsaXIXz+sj/ANXCrXE6FzGK9m0jFlz173n1v88JeKOXMwthB0gDrcxuf3thsiZDfCRVlwK64OqjAlQYgeVaAhWxpiSpiHC15bU8TohxGBiVGg4mV7RaJpUzBPPp19cblIx6GFowWlMEYBxFJ7GIXvOWN6RkxIHmcaLSxoyXjC7tGWlM6CAbsI6i9+mHnDa/hEQD+P7jCDKZcTHLY4fHSto0gDfa2FSGjhOYywmq1Coki/0Hrg/IuzAtBI6wYxX8sWABUkTzuMNOE8UDsQHJZY3JmDsR5eeOfKCQSqNlClYMmhY29zyHqeWGtLLPBggjnpINpEg+REj3wnpO7fExI6cvlhjlnK3BjEIIBBUk7XEHhVjivDuKZzM1FdGNFWMMrhKZU/CbHUzRvMkGR63RKcAAmSAJPU8zgjKZ3SbKPUE/rgk10axX3ET+GKZ3xztGQD4UO57cVhDZZBO9hvgbiGeFQjLU11tMtH2Y222MH9zhrVypNNzSPi0tEG4MHTyPP1HkcLODZcUqgptmf5zA6adRhqZjqJfRMsoUCI56yb3w2DTOaP27pLpAcn6I/K5Yoq6rN5cgYt9Bzxxz/EXtHUoZsGhCky4JvBnkNsdrzzMAbE2MbWMG84+a+3+ZLZkrFksGEnUJN/L08sU6aIOmyMeq0PIYT3V67FceNaK9UAuWZSBsSApBjlv9PbHWeI0BWp+EgNvfY72MXgzuNsfLnAOMVaDQkEEgwRz235b4+neF02NKkWMNoUMdrgQY9xjZ4zE80Ok9l5z97Q7uEr4RnlV/4eqppsTC6iTc8pPXkeduuLHXiygTHznYkfh74V9ouHtUUFGqBtgU5G8Ej1xupZaVM13VWICnUQpL+KYMwZAsPL5CGOja4NH19PCBxD6P4KCqYk/seuI2PTDJ6EglwNPXefWMRLVRZ0Jq8zYD/utjnHTG7LqH4+ya2XwFSe13As89VMxl9RCLHgqaWBBOykw28+e0YP4d/FVaKVM1Aq6SDsogkFA421gSTFvEemLHm8+SBABjkSffaxwpzL6jvHle2HS6hm0Rtymx73kEiqQuWlGmxHUX+uIc5IJIHn88SO0bG/ywv4hmSSWLERzvA35zbGxvptKzYSbQWZpOTJFupsPnjTLCVBmRLtb+nuxI91GA83nNQ+InrJn673GCMmvgpjrrt6sP0x0oZKQyx21OavampSqJllFKrq0rqkmNRICuoi8aT1gicF8U4XqU1KRDRugBFuZWSfkTt8sU/iuXC11ZXBkKWuFgzAABMm0Yd8K4nUWWkQoncR7x5xYY6kMxB5XJn04IBpJeJMmkFZmJMxufu+2K9nPLFn7X5JUK1aYinUkxyUm/sCCPcMBYYqNWrH7nFTpgQkxw0gKq4EqDDJwGB5H8f74X1cTOKdSFqDEcY3qtiMNhazatkxOgx7jMJKtYpkpjDjh2cVRBWZxmMxPILCuhNFPMrw2gxB2jYR+OAuOUFZ/5ZAaIJAFo8jY4zGYjYTutWlt2CgEKgFWk+KZ2MdGNwY8o98G0K0nURJ5YzGYe/ItKYADSPrZFnpMqGGMG5sfJo5YZ8D4V3KXguTLHz6D0xmMxA+Q7S3sje0B25PsuTsMFoCN8e4zEJ4U7zlFd4QBpXVdRExALAMZ8lk+cYYUqT/ZQ35m49rRjzGYo00IkdRwubqXbERmqtSjSaoVLkDwoCJZj8Ki9pMC8C8mwnFf7G9mBlqrZvMVDVzbrBIPgSYLBSfExt8R9ABzzGYunJ0gAj79zlSxnfYKh/wAWu0dXLZMGgxRqjhS1jAgkwD12x8+5rNM5LO2onecZjMX6M7ow48rzsCghy3THWv8ABLtNWeu2VrOz0ypK6mJ0lb2nlANvTGYzD9QB8skoG+F2h8wFXYkbev6YT8VylHNUmo1AwUxsYKkEEFTFiCMZjMcDVal7XCvCbGwEWlnZpamW15aqzNB1Ua28oQAUIJ8LKbxzDSOcOGpu/MOo5ghSvqD/AHxmMx6F51EgjdxXZFJgb+6CzWRq6hppnSQxJkGCNOkeYILXA+z54Bq02WZEHzxmMwGr0rIctTdLO5xooKsmq2A89SiRFj+e+MxmFx/ZtdVp6qVXp8Mam7X8BHh/Q8oGGdKuNCqDtqFuZBB/XGYzF8by7JXntDeEsz8GorRAAvz5/wB8NMjp7omdmG/lDf8A12x7jMVMeQVPM0bUQsV8vUy+7gA05+8vw79fGvoxxzyq2MxmOjeFzwKJQ1Q4FqHGYzHkJCFrYh048xmMWL//2Q==",
      releaseDate: "2025-01-17",
      isActive: true,
      sessionsCount: 8,
      totalTicketsSold: 1923,
    },
    {
      id: "3",
      title: "Top Gun: Maverick",
      description: "Pete 'Maverick' Mitchell'in yeni görevi.",
      genre: "Aksiyon",
      duration: 131,
      rating: 4.7,
      director: "Joseph Kosinski",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
      poster: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFRUXFxUVFhUXFxUVFRgWFRcWFxcVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tKy0tLS0tLS0tLS0tLS0tLS0tLy0tLS0tLi0tLS0tLS0tLS0tLS0tLS0tLS0tL//AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABHEAACAQIDBQYCBgYIBAcAAAABAgMAEQQSIQUGMUFREyJhcYGRFLEHMkKhwdEjUmJykvAVQ1OCstPh8RczosIWJURjc4PS/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAKxEAAgIBBAIBAgUFAAAAAAAAAAECEQMSITFBBBNRImEycYGR8BRSodHx/9oADAMBAAIRAxEAPwCbtK67SkkeOINEfFX1rnDQy7WomnqCF1IrayaG9K2FI4dje9H4drig0a9TRSWIoNpBSbC5MMp4DWkWPhKk3p9LtBYx1NKNo4rOuo1pINtjSVCkvW0k1qFzrXBeujSImHST3rUMhvQXa12klLopDaho0ldCSgVepY3qWmh7GUZ0ohZNKXo1qJjmFrVGSKInzXqdHAqFWAFYpuaSw0HwyE0qxeCfFbRghysYo+9IQCVHdzkMeAv3RT/BqNCRUm7eMUbRniv9dFZRyF1QNcde4tvAmpe170PoRYXWwNJsWasssHGkW0oKXG+mTaEvWicCAdPeoIoTepRdMzWuQrEDqVFwKZyodRsY7D2fbDlDwzOCOliLEUJPhiOVQ7pbRMsSsGBBZibX1N9dDwpvtjDlbMDoR94/n7qmqr79jO1ITXsaJgkoFlN6nhQ01IzK9iO7iH/fY+5P50/wRuVFtSLCxbjxXgQevPnVZ22SuKb+6f8ApH5U5wEZZkIfKQdT1HNTcjjYD2psytIaA+hDqSrjUHiBJbTS3fZvnUwloEwqHDlLP+sALm+mpT5mpi1TxPbcWa3DFlqRZaVGWu45aMgJDVDXbrpQUMtHwspHHWl1GaFsymuEWn4iQilk8FjpwqqmJR5AslSGY0Ihrtnr2KOQNjxNqlXEUtBrtXpXEKGAxBoiLEka0qD1Kj1OURkxjJKGGtDsx86gWSts3Sso0ZsEn41AaKcdaicCqpikBNbVqxlrgimAEpJU6zUvqVDSSiMmMO2qeCWl6NU6tUnFFExr2t6Kwh1pVFJRcWKtXPOO1ItFlnw8wtY1U962kwuIjx0BsTZX0uCV4X/eXT+7Ry42oscO2jaMnRhoeh4g+htUIY9L34Hk7Wx6FsXeWHECJkPekjaTL4Iyo4J6qzAGi9q4cWzda8G3f3rmwPawALdiQrNr2TkhXI8LAaai6DQ17PuttY4nCRSsQ2ZRmIt9YABwQOBzZvupMsZY+eOhFT3QE8Y5VPEguDU8sADeFdKyiuacrZWPBVMbF8HiQ62SCYgE27sc2neNuCMBr6nkBVuxeOjXDu0xEYjGZi2mXlb7/W9IN7Q0mGlVUzkobLzvxBHiDqPKvKcVisRjWEUkrhYkVCpuAMvDMvNri1zrpXThw+x6rpdiyl130emYbeTBSNpOvnZwPci1WPCCOVM0bKw6qQR5XFeEHdkgG0o8ONXj6LHmhn+HkN0kRmQ3JW6amw5GqzwwSuLBU+0Sb8Rdnil8Y1PszD8qJ2TPoPKp/pUis+HfqJF9ihH+I0l2VPoKdwvGhYy3LiJdAa3noCCfu+X8/KpGkqEY7DSe5KxrpWqBZK2XouILCxKaKhnpcpqWKSlcTWN4cVU7TXpTFOvOimcdaXSCzyIpWAVLeopBXtnGclqzPUZrQrBJ1epEeh0p/sua2CxfdQ5TBlJjjZl7VmV8rspYXCjgdOIsdaVoIrLVvtKsmx0X4PVEOaPaTFjGjNeGGJoyHIzLlLEixHGmO4GyoJoY2lC3TFkm6g507KFBGb8R2s0RsdOPWskBlKka4oUmu6s+0kIwsarDGUOHw8jSZIw6O00wzZ7Z2z5QtrkC1ExVgt6liw16t8sMa7NVsqEmOLhGmdXbEzfpGltmsUiKcenWsjiT4PNkW/wxbNYXzfH5L365e7fppQdmKouCJ4VHNHlNWXGECDCEKMzCW/AFssxABPPpXW+SXeJgiKpeYABEjcFZAGhkVBlPZnuhhfMNb0qvsNlUz12JKcb6KvxcqoVKq7qAsKQhLOwyWQDPbTvnU+lJMtM0gpk6SUQslBKDUovU3EZMNWSp0npcHrtWpHAbUId88IM4lA0bRv3hz9Rb2Nevbk7TRsMvcWNrBnVQAuY90sAORKHysa86x2G7SNkPPh4EcP58aWbrbzPgyQQzWN1UW1GgkU3HAoL3vo0aci1Q8jFKcPp5Q+OST37PatoNfUa8weRFLO2tSaTenDoTJHPG0RCloS4zgtxeJeIIN7p66cWmn2/hGBZJ0bQtlF8+gue5xrhhGTW6ZZ/SMJpa87x4YT4mSMayOlgeQVFBJ8z86eYneuDJmVwb90A3UqxYAFltfKBmY2B4AcxSA7UjkLMgyknUE3463+ddeOLjexo03uDtiJQv1Fz5rWubWtxvV13IxK2heRO+JnhFv/dRWU28Mj1SWka/FuN7dz871c91JQkSy8T2shW/C4RUzD+Jh6mjkWxVvbcafSgoMETDishH8SE/9oqnbOfT+f55VZ97sSssFwLMCpI9bX++qpgapj3x0zk4ZYsFJyo0G4Ht7aUswh4Uwvb11/A/hUuGO+CZTapYpF50veaoGnrONiWN8TiAOFCHFnkaAaW/E1w01FQBYxXFVIMYetKhJXYei4mRV71pjUReuY8UyMGVirA3DKSrA9QRqDXqUcllz2b9GeOljWQ9lFm1CSM4cDlmCobeV79bUV/woxv9rh/4pf8ALozdfezBTKExTYuOfQAR4naMqyE/qLHIzA/sn0J5WX4jA9dp+22/yrUNZTx9FON/tcP/ABS/5dSJ9F+OAKiaAK1syh5bNl1Fx2etrm1Wz4jA9dp+22/yoLb2Mwq4adom2ksgikMbN/S6qHCEqWaTugA21bTrQo1iDF7i7Rw+HltiV7II7vFHJPZwFuwEYUBiQLWPHStbP+jzaORGEqRaiQIZJFZHIGtlUgP3V1B5DpVr+krFyJ8CEkdA+KjVwrMoZTa6uAe8vgdKK2/inXauzo1dwjris6BmCNljuM6g2ax4X4VqNZ57sncHGTdoP0cbRyGNlkLA3Cq1xlUgqQwsb61m8m7uPwkCiWQyYcG2VJJGjQ37uZGACgk6G1r+Yv6zZj8WEvmJstjY5uwjtY8jeqjt9ZotgMmKLCfKqt2j53LdsCAXucxyjqdBWo1le2VuRj54FfOsaMoAjkeQHIGzrdApAXMSwB5m9q3g90NoOZcH2uRI8rZGkk7Fw7MQ0YAIIzKTwGvjVz3tfEiPAnCq7uJY3aNJOy7REjLMjMSAVNhob+Ro7dzaGImnlOIwpwxEcQVTKkuYFpbm6jStRrPMMButiZoJJhInZ4dpVysz3Bj7z5AFIAJ15a0w23ujj+0gWedZTI5iRjJK4RsrPqWW4BCHh0qxbpN/5bj/AP5cb/gq8YrDB8t/ssrqehX/AEJHrQ0ms8xxf0ebQlIaXERyECwLyTOQONgWThUQ+jHF/wBpB/FJ/l1atp4mP46ZJmxWUQ4cosBxpUFmxGcsMNoCcqatxtpwNb+IwXXaXttj8qGlGsqn/DLF/wBph/4pP8ule8O5mKwsfavkdPtGMscnQsCo08fer82JwQBJO0QALkn+lwABxJJ4CqTvbvZCf0WCfEEH60z4jFm4PFUjeThyJYddOdBxQbKkKY4DZrOvaHROA/aPh4eNBbNwxmkWNdMx1PJQNWY+QvV5miDJde7GncW+gCrpe9cnkZXCkuWWgrK8mxgFWWRQys1lVrnUX1y2tbSgN7924+yGIjVVUZUZRcd45iGFtOA18hRWL3pjF4rMyq11I4XPHQ8vHxoWXelZYpYSmjqgAP2WViWe448QAPA1BPLqT+/+CtQqiiyYNr3W7Acjxt4Vd92N2lxmAxUw0mjKmNv2VQs6eoPuBWbK2MWs1rjy4+VZtbeBcB28EJDmaJldQSvZO65QxYfaAN7D3F6tLKpvTHkVY3BXIpPZIWOeQoB0QyNe/QsoA487+FR4Ke0jKGuNQrEWJAJs2XW1xbTXjQ0Kli1zcm1ydTfXiedDgFD8q6tGxFSploGLlPdulvLXztVr2LtyBYDBM+UxvGI2Av8A83tC4IGuUZFNwDYt41QYsb3c/Gw+/wD3oTDTlm665iep1/P7qi8OrnY6J5dj17aOEvE9mVgATdSGBynWxGh1B9qreG0NKsLvXJE3ZEZoQrKVsL3bO178Qbvbjaw4HnbVwELBXR3UOAylgGBv+0LcOfSppOG0hU0+DrDGj50JQEcj8+XyrmDZzjUWcfsn8DrTDDxEAhh5g6X/ANa5pyV7FUhDIxuR0qEk0+ijjYzMNR2mVT0yooP33pXiE10qsZ2SaBLmuc1SFK6GGJ4U+oFHCNUwNdR4M0cmzDbjSSnEyTKAYzW+wJoyNCamWKvSczm0i0wGr3uz9IuKiCQTSIUGnbypJK6jlnyOCw8dT51VGjrtcNehrNR7rh2xrqHSfBsrAFWWKUqQeBBE2opbvbHjfgcXnkwxT4efMFilDFeza+UmUgG3Mg15fsbEfDsGZBLHzjYsBxvdSD3W8dfEVbn3k2PazYaXUaqRca8Qf0mtFSTM0MPpbmCDAu2irikZjYmyqLk2Gp0BqwYvZIxOLwWOjlUxwrKQAM3aCZMoKuDYAced6qmyTszHYpVjgPZxwTvIsgNs2eAIw7x1A7T+Kp9sbsxw7OxCxKVm7STsyGcZVkxTLGAAbWykCmAWXC7RSRcc8LhsjsuZeAdMPHcA87HpzFeB7V23icSF7eZ5coOUMdASNSANL+Ne0Nu7go5oY44gsbNLA6KXCtJ2QlDEA8QsTD1NK9jbq4ULDE+HjeVcGZnz3GaRmUKXN9PquPU0QFkRDi4sHPhcQFWN0diFzZ0C5ZIrH6hPA8xapodt4c7QfDiVe17KMZPFWkYrfhmCsDl42N6RbvbEjMcZ+EjBfESpMIpGyRoqSEMpBGbvJGv9/wAKiwW7GCLRSCBW/R4yUNmbvMksYRiwN20Y6+N6AQ07PXZ+z8WssyntWxDKbFe9OtkjAubtenO09o9njMJGTpMuIS3LMojkU+yMP71VPZuysHtGN8sbBjh4D3hOFilk7TM8Xa6G36y3Byil+O2psqDFTxz4eQmN1SMAMwUKgLOCzghizMPJVrGLcyznaGJ7Bol/QYTN2iO9+9irZcrrbn15VvbO08ThYzLPiMIijQfopiWP6qr2t2PgKpWO3t2SqM0OEd5SAAGuim3DMwcmwueVee43GNK5drakkKLhFvyQEmw0HPzvWMWHefffE4wZGISIcUQFQ+uhe7Enyvbz41W81RgU22Xsq7ZprrGDqp0d/wBlRyB/WPpSNpBGeybYaAyn/mSju35R8v4jr5Bar21dtyMAmclBwW+l+JNvOid4byuWztroANALcAANLWqvJsJ5CdWA5XIJPX0pFhX4pch9nSIpZ7niKP2Ng2kbQXreG3KkJ+uB53PyFWzd/c+eIi2ICjX7OblpofH51LLKlSZXHV7jTaOL+DwTTAWksEj/AH30vbnYZmtzymvHJ5CSSSSSbknUkniSeZua9A+lTaJ/RYUtmMYzuQMt2cjLcX4hRyto9edO2t/Gp+Fh0Qcnyx/IyapbcB+zgO+OentXO1IBbMPX8PxrSApJlY6m6ka6HzouZLqV6iu05xOszZMl+7mzW8SAPwprsrDWGY8zSvCwkuFOmuvkKsDEAelBhQux6fpGPkfuFXf6NMZ2mbDyFbOydndlDBwpWyqdTmCqPTwqgS4gljp/twqXBTmKSOYAFo3SRQbgZkYMPqkG1wKjkhqi0PF0z3xdjOuqg+X+tGQwNaxHoeNOtg48YnDxz5SucXswsdCRfnobXHgRR7QAi+lxw9a8epPZnRroqv8ARCZSoXLcljbmx4nWlWJ2C4+qQ3h9U/l99X+ONTyrUmEU08VNboVzXZ5ZJgip7wI89KljUCr9jNmqRyI5gi4++q9j9grxQlD04r+YptfUjX8CUNXfbmo5sK8Z7w05EaqfWomkqlJmsCm2VkF8tcrsy+tqt0yBhY1zHEBWWWVAdFNbBm9stqyDCnpV0liDCxFQw4NByp/e6F0orsOzsxtQuN2Fr3auqRAcBWPAp4gUqzyTs2lMrm7GHbDGZgpYyQSQixAyl8ve8bZasW1N8ULEPCQGOH4toOxl7Q3spJB8BXSQqOArlsKh4qPaqR8qSFcEOYjiJQsgTCkDECeNo5SAY7ZSH7hzOVLjN4jpUc+En+JmxDxwmOTDrhuzWc5gAzE69n+2aVfCJ+qPaoztXGxNnEokspCqyrYcNWKgM2l9CeJvyq8PLi+dhHjfQ22fsiWBcPHCkSxwzvMF+JYkq8UyZCez170obXpXG1dpthFWSdYcoXEplE5Mj9s6OBGoj1Iy2PAa3uK8/wBu7XxUwaOSVuzLFuzGUDjcBioBe37V+F+NIkwZ5Cuj2IXSy7/8QkSMxw4dlAgjhiJcEqYs2Vm01Gq+xqq73bUTF4lsQkZjzhcykgksoy3uP2QvtQJgI5VwYzW1Gog7KuosMzEBQSTyAuaLwmDZzYWA5sdFA6k/hTSTaGHwy9mHALWuTbtH8lvoL8vmaVyfCNwVv+kMRECIolXjd2HfPqToPC3vSrFbVxfN/lTTaW0Wa5VGA5XIJ+6kc8hb63DpVaSVk1cmHbFjL/p8UWWHVVKjvyOtiUS9wAAdSfAeTDaW8KdkIcNCIVVy+e+aRrqBZj058TwqtgdOFH7O2TLKRkjd/wB1Wb5CuaW8tTf+jrjtHSkN9jbTn1Ikf3v86tmz9szqMxcEDWzKOXHgKC2Vu1LHYyRkfvWA9bnU8PCp96lWLByWZczAIADc98gNw0+rmrnllhKSit7HWNpWec7fx7TyyTNxc5vIch6Cw9KU8TwvROJa96GDEcCRXfwjmDcRFIT9Q6a58tl0F75gOFRidjz5X009Na4C3Fjw5V2y6ClchkjmBiGzetGSYsMpHOoezrMla7DRDlomPD2ILi66EgGxI6XtodDWlTgeJvw5Uzlwdu8AcrAWPQ6XBPW+Y2/Kg2FI9f8Ao53jD4CPtWs8bNCxsdcgUqdB+o6eoNWf+noupPkG/GvIN0McywywgD66TC5ABOkTgniNCh/uVZ4mJt/uPQ142bClNnXGKkrLqNtqCSqnW3Gw1HO1/L2rX9OHmGPoPzqrxhvGjYoyetSuuxvXH4Hcm0rjj91LppHP1Wv5n/SozAa7jw55Ghq+4NETSGTgQpB4g6gjxBFLMVsklrqpUdLhh6E2NqdKG51vOelBZZRew3riCVlRJi0va4qVp18Ks8lOqIrE2jd63ULYgCu0lU8DTp2I40SXrYNRySqv1mA8yB86BxO3sNHxlUnovfP/AE3t60VFvhCt0NBWUgTe3DHgzfwm/sL/AH2rmTe6AcnPov4mn9U/7WC18j+ZSRYG1BHZ7EEZzrxpFNvzGPqxk/vMq/IGgZ9/z9lIx5szfK1OvHy/APZEs8exktZh61NFsiMcriqHNv7KeDIP3Uv870FLvpOf65/QBfkBVP6bI+Wv3N7UemtseI/YFV7ebCQwJmuByy31J8BVJi2lJOxzO5UasWYmw6aniaX7QnHBdAOA/Pxq2LxHe8ics32CsTtdidDYcgLgeduZ8aFXEZjc6nrS0tROGQ16DSiiG8mM48KjEMbkj9phbysaaRbKhksWTXzYH1sdaAwZtTzDzaV5ufK+jvw4l2M9nYLDxWIiQH90M3ox1prJtJyLZsg6Dj70gkxQtfnwoKXaFcHoc3cjr9qiqiP2xQPE38zf51V9+8YDHGg/WLfwgL/31zLjaRbxTlinSx97/wC1dPj+OozTOfNlcotCCVqhJ1qaRb6eNq72hgGiIuQQb2te+nUcq9FnGjUWvtepQdKgjey2HrXRbSp1uUVBOetqaHSiI46NUYnw6AkfzrY/kKY5Drxt05cf9KDwcTHXkOZ8ifkD7UwW4bKb+N6nJ7lUg7Z+HzRYgjisSsB1/TQg+ylj6VBh53XgSPIkU23cjBMoPOGaw6nLf8z6VFJhbVBzVtMoosIwm28QvCRvU5v8V6c4TeiYccrea/8A5tSTCYfMQKaR4CozjjfKGWoeR703+tGPQkfMGi8PvFHzRvQg/lSOPBCp0wgqXqxvgVyaH/8A4gg/bHoPzqNtv4f9c/wmkcmGHCg58BrxorxoA9jFp2jP/V4WU+asfkBQk21cbfKIJARyEbH8DXojPpcVRN+8RiEdGSWVEZSLK7KMy8eB5gj2NXx5IylWlE5WlyJsRtvFhsjB1fjlysrW8ABejDsvaTcY39XH4tSBNsYlSSJ5bkWJzsTbzJ0pe7uSSzsxPUk+966qkuEl+n/Cbr7lsG7eM5iJfN1/A0DtjZs0Med5YmFwCqOpbXna3CkAWuitG53u/wCfuCo/ARsyCaZ8kSu7HkP50qwPurJGAcTNDhx0eQM/oi3ufWqvHIym6kqeoJB9xQ81yePmeJPrSSU29nS/Lf8An6Bi4pcFr+C2aOOOdv3YHHzFdFdkj+sxT+SoPmBVNQVKBR0P5YNX2LYcZskf1OKbzZB8nqFtqYHMBFgC19AZJ3BJ6ZVv1HOq0Fptu8T2ltLLmltp9YLlBv5sD6Cj6/z/AHYHIZbaxCL3I0WMc1S5GawB1JuarrveiscxLGswWBLnhpXaqhE56cmRQQk01w+GIFG4fZwXjU09gK5MmfU6R2Y8OlWwHhUwxNhQE8utQtNQWNPczmNGxZoeSe5oLtq0HptAusNU3pTtdHMiixymwDcupo7ObWBsetTsxykcdPlQWxuRH8KQQOpAB8azbzkuAdLL58Sab4Vu8L8KV7zxkTeBRT4cx/PnRjK2acdPArBqQVsKDXZQCiwI2KIVtKgCj+TR2DhDECw4edvzpWOibDRs2t+GtHQ68LkcAeenC/yqKCUAWGp6fnRKQkIjHTMzjhb6uT3Gv3GpSZWI93WK9tGGNlc5GN7aOCvHprRGJjOqnQgkEdCNCKVbNeIsVYsCbhco4udFBvwF+dFysQ797NdmueFzc3NuVc0lcrLLZBmyI+96U8RKWbEW9z5U5AqGR/UOlscgV0Grh2rWaniiEzYN2FD4p+9U0R73pXU+HjzG8oB8AT99UlKhIqx82GIqvb67KMmEka2sf6QeS3zf9Jb2q6Ai1dWFrEC3TlXBDJKMkx2k0fN5t1ri1fQM+7+Db62FgP8A9SflSnEbp4Bv/TIPLMv+EivRXnx7TI+pni6rXWSvVpdx8Cf6tl8pH/Emg5fo+wh+rJMvkyH5pTf1mN/JvVI8xZaiKV6RN9HUX2cRIP3lVvlagZfo6k+ziFbzQj/uNOvJxPsDxy+CidnXQjq3PuBihwKH1I/ChcRuniYxmZAQNTluTbwFtaeOXG3s0K4SXRXMR3QB6nzrey8Z2b36qV18f9QKMm2POxv2T6nmpHHzoY7DmOoic8R9UnUGx4eOldMpxqiKiztpR0orDbTy6VqLYGIKZslzqLfVYcOIa2lCT7MmT60bD0uPcXoa4zVMdJw3Q4Xad64mxVxSJWIrsYg0jxR6KLK+wiaXWoi9DtJW1aqJUI3ZOrVMhoUOK6EtEUYR1P8AZa3Q/Kl8Lkm2g08Bbxua7wmK1sL0rCmZFJewB42oLbU5YoD9lbe54UU8RTvAHKDx6X61zvBhwAkijRwb+B0IH3n2qcVuWySuImVqkRr6GobV2FqjRFMlU0TDiCBlGg+/35UEhqZGpGh7D8O9qPw+JuwBPdBJ6chc+fdA9BShXqSHMVuBe5t8vxIpXEeL3LJsvFqGDMAwDBip1BAN8v4U72zgxFO6KbqDdGve6N3lN+ehF/G9UWPEMri9l8blluPEX14CrcspdYySG7igMOBAuBbwHD0qE4U7LqVj7YYsp/nhR0k1qF2Ylor+dKsbjTwrjUNc2Uk6Qz+JvXYmpJBMTRqk106KIt2MsM/e9KgxJ71bwI1PlW54zeh2KX5YtLGu+zrrMKy4rxtRajkx+NcNhlPGpswrWYUNQQY4Na5OE6USWrWehYbYKcKfCoDHTHPXLAGipM1iuQkcBf1rFccxai5MMDzoWTBEczTqSMQymPmB7UO2EhbgAPLSpGwB61FJg786qmumYj+Aj/W+Vd/0fCNSRXLYAdailwZPSnu+wHM+ycE/1kjbzUE/KhzuxgSNIo/aiRs8ePvUkezhzNNra4kwUivbY+j/AA81mgcQkaEAZkPpcEHxvUGB+jlIzmaXtCOVsq+1yT71dYcCg61McKvjVVnyJVqJuELuiljdWEH/AJCeg/KpI9z8Mx1iHoXHyNXAYIW0JFdxYa1D3zfYdMTxA7OHauqg5c7BR+zmOUXPhamsGzLHLYAnT1q347Yo+xowve2mv40GmzJL/UY+QJPyr0fbaObSB4XYz2NlDEKWKixJAsCbcxrwqsb1y5oRpazg+hDD8q9K3cwMqTFjGVXIy94Eam1gL+Vec7ywFcO9xbKyaeOYC3zoY8jcqDJbFPqZVodGFGQWNhfj91dLJrckxmGyBARZrEt5k6C/gtvc0Mppvt03y6W/DQaUoSIVODuKbGktwiMg86MsQAdMo7umgIJ1OhBduF7clF6hwsAPL500RGvZQc3C/wBojoOg8B6mllKi2OFnYiAyluNwMtszZToQ+U5YxlJsiXNyL9aK2OrI5ia+oZlv4AtccgCoOnUcrmgYQENms3IXJ7MHmpK6uRp3E431Nq7TFMksRvZVlUksFBW5Ga6gZY1Iv3NSANaR8UVfyXjDYg5Aq24Up+CdmJrWA28jJGhQiVUbMwtlYBmAbwIFl6k1LBirtbnXOlKDdI1qQVh9nsOVMEwhtwqPDy8qJE4qUsshtKJcHDa96ldNaydGVc2luGhvQhxDUuu9waS6dpXJxKjmPesrK4VjTDZr4kdR7itNP4isrKVxphA59qZTa1/I1i7VU9aysqqxRozZKmPU9aI7YVlZSSgkwWZnreesrKWkCzhsQOtCzYlOZFZWVSEEEiM8fUe9RmVOTCsrKppo1GJKp5ipQ4rKys0K1RKriuhLWVlOuBDfxQGhrTYjpW6ynhFAka7euGxJ61lZVWkKmcnGWBPQE15HvjOXhZrWzOGI10uSbe9qysqvixSkCfBTEFHYIqGBI0BFbrK9CStEo8hu27XAGote/I8Bp7UqU61lZU4fhQ0uRts9b2p9NoMpFj4cD0zc7etZWVGauVFYyaVoX4rCM3nyOgIt0/VHgvvUeE2PIzBn0RfQ+Sr9nhx0rKyhKTiqQV9XI3SMCyotgBYDXQevmaJOAkAzgG2mvSsrK58mRxaKJbD6HD6I3DN8+n3Gp3hIbLawtcNyJ5hqysrnYdTMhmvdeeoI/GlsmKKnKRqNKysoxW4T/9k=",
      releaseDate: "2025-05-27",
      isActive: true,
      sessionsCount: 6,
      totalTicketsSold: 1456,
    },
  ]);

  const genres = [
    "Aksiyon",
    "Komedi",
    "Drama",
    "Bilim Kurgu",
    "Korku",
    "Romantik",
    "Gerilim",
    "Animasyon",
    "Belgesel",
    "Fantastik",
  ];

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMovie = () => {
    setFormData({
      title: "",
      description: "",
      genre: "",
      duration: 0,
      rating: 0,
      director: "",
      cast: [],
      poster: null,
      trailer: "",
      releaseDate: "",
    });
    setEditingMovie(null);
    setShowAddModal(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      duration: movie.duration,
      rating: movie.rating,
      director: movie.director,
      cast: movie.cast,
      poster: null,
      trailer: movie.trailer || "",
      releaseDate: movie.releaseDate,
    });
    setEditingMovie(movie);
    setShowAddModal(true);
  };

  const handleSaveMovie = () => {
    // Here you would typically make an API call to save the movie
    console.log("Saving movie:", formData);
    setShowAddModal(false);
  };

  const handleDeleteMovie = (movieId: string) => {
    // Here you would typically make an API call to delete the movie
    console.log("Deleting movie:", movieId);
  };

  const handleInputChange = (field: keyof MovieForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCastChange = (castString: string) => {
    const castArray = castString
      .split(",")
      .map((actor) => actor.trim())
      .filter((actor) => actor);
    handleInputChange("cast", castArray);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}sa ${mins}dk`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Film Yönetimi</h1>
            <p className="text-gray-300 mt-1">
              Sinemada gösterilecek filmleri yönetin
            </p>
          </div>
          <Button onClick={handleAddMovie}>
            <Plus className="h-4 w-4 mr-2" />
            Film Ekle
          </Button>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Film adı, tür veya yönetmen ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="relative h-64">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditMovie(movie)}
                    className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="bg-black/40 backdrop-blur-sm text-white hover:bg-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      movie.isActive
                        ? "bg-green-500/80 text-green-100"
                        : "bg-gray-500/80 text-gray-100"
                    }`}>
                    {movie.isActive ? "Aktif" : "Pasif"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {movie.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {movie.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <Film className="h-4 w-4 mr-2 text-purple-400" />
                    {movie.genre} • {movie.director}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-blue-400" />
                    {formatDuration(movie.duration)}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    {movie.rating}/5.0
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 text-green-400" />
                    {movie.sessionsCount} seans
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Users className="h-4 w-4 mr-2 text-orange-400" />
                    {movie.totalTicketsSold} bilet satıldı
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>
                    Yayın:{" "}
                    {new Date(movie.releaseDate).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12">
            <Film className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Film bulunamadı
            </h3>
            <p className="text-gray-400">
              Arama kriterlerinize uygun film bulunamadı.
            </p>
          </motion.div>
        )}

        {/* Add/Edit Movie Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={editingMovie ? "Film Düzenle" : "Yeni Film Ekle"}>
          <div className="space-y-4 max-h-[70vh] p-4 overflow-y-auto">
            <Input
              label="Film Adı"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Tür
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">Tür seçin</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-gray-800">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Süre (dakika)"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  handleInputChange("duration", parseInt(e.target.value) || 0)
                }
                className="bg-white/5 border-white/20 text-white"
              />
              <Input
                label="Puan (1-5)"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) =>
                  handleInputChange("rating", parseFloat(e.target.value) || 0)
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <Input
              label="Yönetmen"
              value={formData.director}
              onChange={(e) => handleInputChange("director", e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />

            <Input
              label="Oyuncular (virgülle ayırın)"
              value={formData.cast.join(", ")}
              onChange={(e) => handleCastChange(e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />

            <Input
              label="Fragman URL"
              value={formData.trailer}
              onChange={(e) => handleInputChange("trailer", e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />

            <Input
              label="Çıkış Tarihi"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleInputChange("releaseDate", e.target.value)}
              className="bg-white/5 border-white/20 text-white"
            />

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Film Posteri
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    Dosya seçin veya sürükleyip bırakın
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleInputChange("poster", e.target.files?.[0] || null)
                    }
                    className="hidden"
                    id="poster-upload"
                  />
                  <label
                    htmlFor="poster-upload"
                    className="mt-2 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700">
                    Dosya Seç
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowAddModal(false)}
                className="text-white hover:bg-white/10">
                İptal
              </Button>
              <Button onClick={handleSaveMovie}>
                <Save className="h-4 w-4 mr-2" />
                {editingMovie ? "Güncelle" : "Kaydet"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default MoviesPage;
