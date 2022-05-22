import React from 'react';
import './style.css';


class Pixel extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            result: false,
            viewports: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitpixelForm = this.submitpixelForm.bind(this);
        

    };
    componentWillMount() {
        const viewport_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        let fields = this.state.fields;
        fields['viewport_width'] = viewport_width;
        this.setState({
            fields
        });
        this.generate_viewport_table();
    }


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
      
        this.setState({
            fields
        });
        let viewport_width = this.state.fields['viewport_width'];
        let size_in_px = this.state.fields['size_in_px'];
        if(viewport_width!== "" && viewport_width!==undefined){
            this.generate_viewport_table();
        }
        
        if(viewport_width!== "" && viewport_width!==undefined && size_in_px!=="" && size_in_px!== undefined){ 

            let generated_viewport =  this.getviewportValue(viewport_width,size_in_px);

            fields['generated_viewport'] = generated_viewport;
            this.setState({
                fields
            });
            this.setState({result :true});
            
        }
        else {
            this.setState({result :false});
        }

        
        
    }

    submitpixelForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            console.log("submitted");
        }

    }
    handleMaxinput(event){
       
        if(event.target.value.length===4){
            event.preventDefault();
            event.stopPropagation();
        } 
        
    }
    getviewportValue(vp,px){
       
        let persent = vp / 100;
        let viewport = px / persent;
        
        if (viewport % 1 === 0){
            viewport = viewport + 'vw';
        }
        else {
            viewport = viewport.toFixed(4) + 'vw';
        }
        return viewport;
    }
    generate_viewport_table(){
        for(let i =1;i<=40;i++ ){
            let range =2;
            var multiples_value  = i*range;
            let res = this.getviewportValue(this.state.fields['viewport_width'],multiples_value);
            let viewports = this.state.viewports;
            viewports[multiples_value] = res;
        }
    }
    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["viewport_width"]) {
            formIsValid = false;
            errors["viewport_width"] = "*Please enter viewport Width.";
        }
        
        if (!fields["size_in_px"]) {
            formIsValid = false;
            errors["size_in_px"] = "*Please enter Size in Pixel.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }



  render() {
    return (
        <div className="container">
            <header>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="./">PX to VW</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="github.com/">Github</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <section className='mt-3 mb-3'>
                <h1 className='pb-3 text-center'>PX To VW Converter</h1>
                <p className='desc col-md-8 mx-auto'>This is a free, easy for use converter which you can use to convert Pixels (px) to Viewport width unit (vw). type the Viewport width value and the Pixel size (px) value which you want to convert to vw!</p>
                <div className="row col-md-12 content-wrapper">
                    <div className="col-md-6">
                        <div className="card mb-5">
                            <div className="card-header">
                                <h6>PX TO VW CALCULATOR INFO</h6>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Nowadays with modern CSS, we have new features like viewport units. This opens up for a responsive approach for defining font or other sizes. This is very useful, and every developer building responsive websites should make sure they know about this option. It’s already a safe method for old browsers too, so you can use it every project.</p>
                                <p className="card-text">Viewport width unit ‘vw’ is short for ‘viewport width’ and a percent value of the width of the viewport.</p>
                            </div>
                        </div>
                        <div className="card mb-5">
                            <div className="card-header">
                                <h6>PIXELS: PX</h6>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Pixel px – is the most basic, absolute, and final unit of measurement.</p>
                                <p className="card-text">The number of pixels is set in the screen resolution settings, one px is just one such pixel on the screen. The browser will eventually convert all values ​​into pixels.</p>
                                <p className="card-text">Pixels can be fractional, for example, the size can be set to 16.5px. This is completely normal, the browser itself uses fractional pixels for internal calculations. For example, there is an element 100px wide, it needs to be divided into three parts – willy-nilly 33.333… px appear. In the final rendering, fractional pixels are of course rounded and made whole.</p>
                                <p className="card-text">For mobile devices that have a lot of pixels on the screen, but the screen itself is small, the browser will automatically apply scaling to ensure readability.</p>
                            </div>
                        </div>
                        <div className="card mb-5">
                            <div className="card-header">
                                <h6>SCREEN-RELATIVE: VW, VH</h6>
                            </div>
                            <div className="card-body">
                                <p className="card-text">All modern browsers except IE8-support the new CSS Values ​​and Units 3 draft units:</p>
                                <p className="card-text">vw – 1% of window width</p>
                                <p className="card-text">vh – 1% of the window height</p>
                                <p className="card-text">vmin is the smallest of (vw, vh), in IE9 denoted as vm</p>
                                <p className="card-text">vmax – greatest of (vw, vh)</p>
                                <p className="card-text">These values ​​were created primarily to support mobile devices.</p>
                                <p className="card-text">Their main advantage is that any dimensions that are specified in them are automatically scaled when the window is resized.</p>
                            </div>
                        </div>
                        <div className="card mb-5">
                            <div className="card-header">
                                <h6>How to convert pixel (px) to vw?</h6>
                            </div>
                            <div className="card-body">
                                <p className="card-text">You can convert px to vw easily using the converter we made for you above, or you can use the following formula:</p>
                                <p className="card-text"><b>Viewport width unit (vw) = 100 * (Pixel Unit Size / Viewport width)</b></p>
                                <p className="card-text">For example, to convert 120 pixel to vw if the viewport width is 1000: vw =100 * (120/1000)</p>
                            </div>
                        </div>
                    </div>
                    <div className="row col-md-6">
                        <div className="col-md-6">
                            <div className="card mb-5">
                                <div className="card-header">
                                    <h6>PX TO VW</h6>
                                </div>
                                <div className="card-body">
                                    <form method="post" onSubmit= {this.submitpixelForm}>
                                        <div className="mb-3">
                                            <label htmlFor="viewport_width" className="form-label">Viewport Width</label>
                                            <input type="number" className="form-control" min="1" max="9999" name="viewport_width" onKeyPress={this.handleMaxinput} value={this.state.fields.viewport_width} onChange={this.handleChange} />
                                            <div className="errorMsg">{this.state.errors.viewport_width}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="size_in_px" className="form-label">Pixel Unit Size:</label>
                                            <input type="number" className="form-control" min="1" max="9999" name="size_in_px" onKeyPress={this.handleMaxinput} value={this.state.fields.size_in_px ?? ""} onChange={this.handleChange} />
                                            <div className="errorMsg">{this.state.errors.size_in_px}</div>
                                        </div>
                                        <div className={this.state.result ? 'show text-success' : "d-none"}>
                                            <div className='text-center'><h2>{this.state.fields.size_in_px ?? ""}px = {this.state.fields.generated_viewport}</h2></div> 
                                        </div>    
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={this.state.result ? 'show card mb-5' : "d-none"}>
                                <div className="card-header">
                                    <h6>PX TO VW Table</h6>
                                </div>
                                <div className="card-body">
                                    <div className='pixeltable'>
                                        <h6>This is a chart for Px to vw conversion results if viewport width is {this.state.fields.viewport_width}</h6>
                                    </div>
                                    <table className="table table-bordered table-striped table-dark"> 
                                        <thead>
                                            <tr>  
                                                <th>PX</th>  
                                                <th>VW</th>  
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            {this.state.viewports.map((result, index) => (  
                                            <tr key={index / 5} >  
                                                <td>{index}px</td>  
                                                <td>{result}</td>  
                                            </tr>  
                                            ))}  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  }

}


export default Pixel;