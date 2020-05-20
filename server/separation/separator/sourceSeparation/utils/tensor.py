
import tensorflow as tf

def pad_and_partition(tensor, segment_len):

    tensor_size = tf.math.floormod(tf.shape(tensor)[0], segment_len)
    pad_size = tf.math.floormod(segment_len - tensor_size, segment_len)
    padded = tf.pad(
        tensor,
        [[0, pad_size]] + [[0, 0]] * (len(tensor.shape)-1))
    split = (tf.shape(padded)[0] + segment_len - 1) // segment_len
    return tf.reshape(
        padded,
        tf.concat(
            [[split, segment_len], tf.shape(padded)[1:]],
            axis=0))


def pad_and_reshape(instr_spec, frame_length, F):
    
    spec_shape = tf.shape(instr_spec)
    extension_row = tf.zeros((spec_shape[0], spec_shape[1], 1, spec_shape[-1]))
    n_extra_row = (frame_length) // 2 + 1 - F
    extension = tf.tile(extension_row, [1, 1, n_extra_row, 1])
    extended_spec = tf.concat([instr_spec, extension], axis=2)
    old_shape = tf.shape(extended_spec)
    new_shape = tf.concat([
        [old_shape[0] * old_shape[1]],
        old_shape[2:]],
        axis=0)
    processed_instr_spec = tf.reshape(extended_spec, new_shape)
    return processed_instr_spec

