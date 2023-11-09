import ShareMenu from "./ShareMenu";
import {editFile} from "../../actions/files"
import {editSelectedItem, setShareSelected, editShareSelected} from "../../actions/selectedItem"
import env from "../../enviroment/envFrontEnd";
import axios from "axios";
import Swal from "sweetalert2"
import copy from "copy-text-to-clipboard";
import {connect} from "react-redux";
import React from "react";

const currentURL = env.url;

class ShareMenuContainer extends React.Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();

        this.showingSwal = false;

        this.state = {
            title: "No Link"
        }
    }

    handleClickOutside = (e) => {

        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && !this.showingSwal) {

            this.props.dispatch(setShareSelected(""))
        }
    }

    hide = () => {

        this.props.dispatch(setShareSelected(""))
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    makePublic = () => {

        this.showingSwal = true;

        Swal.fire({
            title: 'Are you sure?',
            text: "Making this public, will allow anyone to have access to it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make public'
          }).then((result) => {

            this.showingSwal = false;

            if (result.value) {

                const config = {
                    headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
                };

                axios.patch(currentURL +`/file-service/make-public/${this.props.shareSelected._id}`, undefined,config).then((results) => {

                    this.props.dispatch(editFile(this.props.shareSelected._id,{"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "public"
                    }}))

                    this.props.dispatch(editSelectedItem({link: results.data,
                        linkType: "public"}))


                    this.props.dispatch(editShareSelected({"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "public"
                    }}))

                }).catch((err) => {
                    console.log(err)
                })


            }
          })
    }

    makeOne = () => {

        this.showingSwal = true;

        Swal.fire({
            title: 'Are you sure?',
            text: "One time link, will allow anyone to access this file once",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create link'
          }).then((result) => {

            this.showingSwal = false;

            if (result.value) {

                const config = {
                    headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
                };

                axios.patch(currentURL +`/file-service/make-one/${this.props.shareSelected._id}`, undefined,config).then((results) => {

                    this.props.dispatch(editFile(this.props.shareSelected._id,{"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "one"
                    }}))

                    this.props.dispatch(editSelectedItem({link: results.data,
                        linkType: "one"}))


                    this.props.dispatch(editShareSelected({"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "one"
                    }}))

                }).catch((err) => {
                    console.log(err)
                })


            }
          })

    }

    removeLink = () => {

        const headers = {'Authorization': "Bearer " + window.localStorage.getItem("token")}

        axios.delete(currentURL +`/file-service/remove-link/${this.props.shareSelected._id}`, {
            headers
        }).then(() => {

            this.props.dispatch(editFile(this.props.shareSelected._id,{"metadata": {
                ...this.props.shareSelected.metadata,
                link: undefined,
                linkType: undefined
            }}))

            this.props.dispatch(editSelectedItem({link: undefined,
                linkType: undefined}))


            this.props.dispatch(editShareSelected({"metadata": {
                ...this.props.shareSelected.metadata,
                link: undefined,
                linkType: undefined
            }}))
        }).catch((err) => {
            console.log(err)
        })
    }

    copyLink = () => {

        const link = currentURL + "/download-page/" + this.props.shareSelected._id + "/" + this.props.shareSelected.metadata.link;

        copy(link)

        Swal.fire("Link Copied")
    }

    render() {

        return <ShareMenu
                hide={this.hide}
                removeLink={this.removeLink}
                makeOne={this.makeOne}
                makePublic={this.makePublic}
                // removeLink={this.removeLink}
                copyLink={this.copyLink}
                ref={this.wrapperRef}
                state={this.state}
                {...this.props}/>
    }
}

const connectStateToProps = (state) => ({

    shareSelected: state.selectedItem.shareSelected
})

export default connect(connectStateToProps)(ShareMenuContainer);
