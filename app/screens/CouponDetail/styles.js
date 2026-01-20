import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    // Top header image
    headerImage: {
        width: width,
        height: 250,
        resizeMode: 'cover',
    },

    // Main content container
    content: {
        padding: 16,
        backgroundColor: '#fff',
    },

    // Coupon title
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },

    // Brand name
    brand: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        marginBottom: 8,
    },

    // Discount text
    discount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FF6B6B',
        marginBottom: 12,
    },

    // Description text
    desc: {
        fontSize: 16,
        color: '#444',
        marginBottom: 12,
        lineHeight: 22,
    },

    // Meta info: rating & reviews
    meta: {
        fontSize: 14,
        color: '#999',
        marginBottom: 16,
    },

    // Coupon code container
    codeBox: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },

    // Coupon code text
    code: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        letterSpacing: 2,
    },

    // QR / Barcode button
    qrButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },

    qrText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

    // Related Coupons section title
    relatedTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        paddingHorizontal: 16,
        marginBottom: 12,
    },

    // Optional: wrapper for FlatList (if needed)
    relatedList: {
        paddingLeft: 16,
        paddingBottom: 24,
    },
    back: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: hp('3%'),
        marginLeft: hp('1%'),
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // semi-transparent white
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000', // subtle shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // for Android shadow
        zIndex: 10,
    },
    backTxt: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        paddingLeft: hp("0.5%")
        // marginBottom: 8,
    },
});
