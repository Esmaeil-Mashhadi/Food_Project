import DetailsPage from "@/components/templates/DetailsPage";

const Detail = ({data}) => {

    return (
        <div>
            <DetailsPage food = {...data}/>
        </div>
    );
};

export default Detail;

export async function getStaticPaths(){
    const res = await fetch("http://localhost:4000/data")
    const json = await res.json()
    const data = json.slice(0, 10);

    const paths = data.map(item=>  ({
        params :{detail : item.id.toString()}
    }))

    return{
        paths,
        fallback:true,
    }
   
}



export async function getStaticProps(context){

     const {params} = context
     const res = await fetch(`http://localhost:4000/data/${params.detail}`)
     const data = await res.json()
     return{
        props:{
           data           
        }
     }
}


