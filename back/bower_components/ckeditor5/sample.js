/**
 * Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* exported initSample */

ClassicEditor
    .create( document.querySelector( '#editor' ), {

        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'indent',
                'outdent',
                '|',
                /*'imageUpload',*/
                'blockQuote',
                /*'insertTable',*/
                'mediaEmbed',
                'undo',
                'redo'
            ]
        },
        fillEmptyBlocks: false,
        basicEntities: false,
        tabSpaces: 0,
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        licenseKey: '',


    } )
    .then( editor => {
        window.editor = editor;




    } )
    .catch( error => {
        console.error( 'Oops, something gone wrong!' );
        console.error( 'Please, report the following error in the https://github.com/ckeditor/ckeditor5 with the build id and the error stack trace:' );
        console.warn( 'Build id: k2i30chx32nf-8o65j7c6blw0' );
        console.error( error );
    } );
