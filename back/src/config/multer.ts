import {diskStorage} from 'multer';

export const avatarOptions: object  = {
    storage: diskStorage({
        destination: 'src/public/avatars',
        filename: (req, file, cb) => {
            return cb(null, `${file.originalname}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        const extension = file.mimetype.split('/')[0];
        if (extension !== 'image') {
            return callback(new Error( 'You can upload only supporting  file types'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: +process.env.MAX_SIZE_AVATAR,
    },
};
