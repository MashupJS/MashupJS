using System;
using System.Data;

namespace Mashup.Api.AuthADSP.HelperClasses
{

    /// <summary>
    /// Helper class for when dealing with Null values.
    /// </summary>
    public static class NullHelper
    {

        // ----------------------------------------------------------------------------------------------------------------
        // These are null helpers for TryParse which doesn't seem to understand nullable types.
        // ----------------------------------------------------------------------------------------------------------------

        // Returns null if the string cannot be parsed to int, otherwise returns the parsed value.
        public static int? ToNullableInt32(string s)
        {
            int i;
            if (Int32.TryParse(s, out i)) return i;
            return null;
        }
        // Returns null if the string cannot be parsed to bool, otherwise returns the parsed value.
        public static bool? ToNullableBool(string s)
        {
            bool i;
            if (bool.TryParse(s, out i)) return i;
            return null;
        }

        // Returns a null value if the string equals "null" or if the string cannot be parsed to int.
        public static int? FromStringNullToInt32(string s)
        {
            if (s == "null")
            { return null; }
            else
            { 
                // Verify the string is an int.
                
                return ToNullableInt32(s); 
            }
        }
       
        public static bool? FromStringNullToBool(string s)
        {
            if (s == "null")
            { return null; }
            else
            {
                // Verify the string is an int.

                return ToNullableBool(s);
            }
        }

        public static string FromStringNullToString(string s)
        {
            if (s == "null")
            { return null; }
            else
            {
                // Verify the string is an int.

                return s;
            }
        }



        // ----------------------------------------------------------------------------------------------------------------
        // These are null helpers for data readers.
        // ----------------------------------------------------------------------------------------------------------------
        public static DateTime GetDateFromReader(IDataRecord reader, string field, int? toLocalOffsetMinutes)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                DateTime date = reader.GetDateTime(index);

                if (toLocalOffsetMinutes != null)
                { date = GMT.GmtToLocal(date, (int)toLocalOffsetMinutes); }

                return date;
            }


            return DateTime.MinValue;
        }
        public static DateTime? GetDateFromReaderNullable(IDataRecord reader, string field, int? toLocalOffsetMinutes)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                DateTime date = reader.GetDateTime(index);

                if (toLocalOffsetMinutes != null)
                { date = GMT.GmtToLocal(date, (int)toLocalOffsetMinutes); }

                return date;
            }

            return null;
        }

        public static decimal GetDecimalFromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {   // The G29 string formate removes trailing zeros for decimals.
                // IE "1.1000" would become "1.1"
                decimal returnValue = reader.GetDecimal(index);
                return Convert.ToDecimal(returnValue.ToString("G29"));
            }

            return 0m;
        }

        public static Int16 GetInt16FromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                return reader.GetInt16(index);
            }

            return 0;
        }

        public static Int32 GetInt32FromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                return reader.GetInt32(index);
            }

            return 0;
        }
        public static Int32? GetInt32FromReaderNullable(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                return reader.GetInt32(index);
            }

            return null;
        }

        public static Int64 GetInt64FromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            { return reader.GetInt64(index); }

            return 0;
        }

        public static string GetStringFromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                //return reader.GetString(index).TrimEnd();
                return reader[index].ToString();
            }

            return String.Empty;
        }

        public static float GetFloatFromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            {
                float temp;
                float.TryParse(reader[index].ToString(), out temp);
                return temp;
            }
            //{ return reader.GetFloat(index); }

            return 0f;
        }
        public static bool GetBooleanFromReader(IDataRecord reader, string field)
        {
            int index = reader.GetOrdinal(field);

            if (!reader.IsDBNull(index))
            { return reader.GetBoolean(index); }

            return false;
        }

    }
}